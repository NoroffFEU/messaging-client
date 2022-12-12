import { getProfiles } from "../api/profiles/index.js";

export async function setupProfileSelect() {

  const select = document.querySelector("select#recipient");

  const profiles = await getProfiles();
  
  profiles.forEach(profile => {
    const option = document.createElement("option");
    option.value = profile.name;
    option.innerText = profile.name;
    select.append(option)
  })
}