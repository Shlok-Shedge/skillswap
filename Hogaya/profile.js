let shareSkills = [];
let learnSkills = [];

function addSkill(type) {
  const input = document.getElementById(type + "Input");
  const list = document.getElementById(type + "Skills");
  if (!input || input.value.trim() === "") return;

  const skillText = input.value.trim();
  const div = document.createElement("div");
  div.className = "skill-tag";
  div.textContent = skillText;

  const removeBtn = document.createElement("span");
  removeBtn.textContent = " ❌";
  removeBtn.className = "remove-btn";
  removeBtn.onclick = function() {
    div.remove();
    if (type === "share") shareSkills = shareSkills.filter(s => s !== skillText);
    else learnSkills = learnSkills.filter(s => s !== skillText);
  };

  div.appendChild(removeBtn);
  list.appendChild(div);

  if (type === "share") shareSkills.push(skillText);
  else learnSkills.push(skillText);

  input.value = "";
}

const upload = document.getElementById("upload");
const profileImage = document.getElementById("profileImage");
const removePhotoBtn = document.getElementById("removePhotoBtn");

upload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profileImage.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

removePhotoBtn.addEventListener("click", function() {
  profileImage.src = "default-avatar.png";
  upload.value = "";
});

function saveProfile() {
  localStorage.setItem("name", document.getElementById("name").value || "");
  localStorage.setItem("age", document.getElementById("age").value || "");
  localStorage.setItem("profilePhoto", profileImage.src || "default-avatar.png");
  localStorage.setItem("shareSkills", JSON.stringify(shareSkills));
  localStorage.setItem("learnSkills", JSON.stringify(learnSkills));
  window.location.href = "display.html";
}
