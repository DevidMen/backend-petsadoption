import { promisify } from "util";
import { db } from "../data/database.js";
const promiseQuery = promisify(db.query).bind(db);
const querypet = "SELECT * FROM pets WHERE owner = ? AND adoptionStatus = ?";
const queryAllpets = "SELECT * FROM pets";
async function addPets(
  type,
  namePets,
  height,
  weight,
  color,
  hypo,
  breed,
  dietary,
  adoptionStatus,
  biography,
  image
) {
  const query = `INSERT INTO pets (type, namePets, height, weight, color, hypo, breed, dietary, adoptionStatus, biography, image) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
  const result = await promiseQuery(query, [
    type,
    namePets,
    height,
    weight,
    color,
    hypo,
    breed,
    dietary,
    adoptionStatus,
    biography,
    image,
  ]);

  if (result) {
    return result;
  } else {
    return false;
  }
}
async function getPets() {


  const allPets = await promiseQuery(queryAllpets);
  if (allPets) {
    return allPets;
  } else {
    return false;
  }
}
async function getPetsFromUser(email) {
  const queryAllpets = "SELECT * FROM pets WHERE owner = ?";

  const allPets = await promiseQuery(queryAllpets, [email]);
  if (allPets) {
    return allPets;
  } else {
    return false;
  }
}
async function getPet(petsId) {
  const querypet = "SELECT * FROM pets WHERE petsId = ?";
  const pet = await promiseQuery(querypet, [petsId]);
  if (pet) {
    return pet;
  } else {
    return false;
  }
}
async function getMySavedPet(email) {
  const savequery =
    "SELECT * FROM pets INNER JOIN savepets ON pets.petsId= savepets.petsId WHERE email = ?";
  const result = await promiseQuery(savequery, [email]);
  return result;
}
async function getMyAdoptedPet(email) {
  const status = "Adopted";

  const pet = await promiseQuery(querypet, [email, status]);
  return pet;
}
async function getMyFosteredPet(email) {
  const status = "Fostered";

  const pet = await promiseQuery(querypet, [email, status]);
  return pet;
}
async function adopt(email, petsId) {
  const status = "Adopted";
  const queryOfOwner =
    "UPDATE pets SET owner = ?, adoptionStatus = ? WHERE petsId = ?";
  const update = await promiseQuery(queryOfOwner, [email, status, petsId]);
  const queryAllpets = "SELECT * FROM pets";
  const result = await promiseQuery(queryAllpets);
  return result;
}

async function returnAgency(email, petsId) {
  const queryEmail = "SELECT * FROM pets WHERE petsId = ?";
  const isOwner = await promiseQuery(queryEmail, [petsId]);
  if (isOwner[0].owner === email) {
    const queryOfOwner =
      "UPDATE pets SET owner = ?, adoptionStatus = ? WHERE petsId = ?";

    const status = "Avaiable";
    const ownernull = "";
    const petModuleOwner = await promiseQuery(queryOfOwner, [
      ownernull,
      status,
      petsId,
    ]);


    const getpets = await promiseQuery(queryAllpets);

    return getpets;
  } else {
    return false;
  }
}
async function fostered(email, petsId) {
  const status = "Fostered";
  const queryOfOwner =
    "UPDATE pets SET owner = ?, adoptionStatus = ? WHERE petsId = ?";
  const queryAllpets = "SELECT * FROM pets";
  const update = await promiseQuery(queryOfOwner, [email, status, petsId]);
  const result = await promiseQuery(queryAllpets);
  return result;
}
async function save(email, petsId) {
  const queryAllpets = "SELECT * FROM pets";
  const query = `INSERT INTO savepets (email, petsId) VALUES (?,?)`;
  const update = await promiseQuery(query, [email, petsId]);
  const result = await promiseQuery(queryAllpets);
  return result;
}
async function unSave(email, petsId) {
  const query = `DELETE FROM savepets WHERE email = ? AND petsId = ?`;
  const result = await promiseQuery(query, [email, petsId]);

  return result;
}
async function deletePet(petsId) {
  const queryPets = "SELECT * FROM pets";
  const query = `DELETE FROM pets WHERE petsId = ?`;
  const querySavedPets = `DELETE FROM savepets WHERE petsId = ?`;
  const result = await promiseQuery(query, [petsId]);
    const resultSavedPets = await promiseQuery(querySavedPets, [petsId]);
    const resultOfPets = await promiseQuery(queryPets);
    return resultOfPets;
  
}

async function searchPets(
  searchType,
  searchName,
  searchHeigth,
  searchWeigth,
  searchAdoptionStatus
) {
  const querySearch =
    "SELECT * FROM pets WHERE( type IS NOT NULL AND type like ? AND namePets IS NOT NULL AND namePets like ? AND height IS NOT NULL AND height like ? AND weight IS NOT NULL AND weight like ? AND adoptionStatus IS NOT NULL AND adoptionStatus like ?)";
  const result = await promiseQuery(querySearch, [
    searchType + "%",
    searchName + "%",
    searchHeigth + "%",
    searchWeigth + "%",
    searchAdoptionStatus + "%",
  ]);

  if (result) {
    return result;
  } else {
    return false;
  }
}

async function update(
  namePets,
  type,
  color,
  dietary,
  weight,
  height,
  hypo,
  adoptionStatus,
  breed,
  biography,
  image,
  petsId
) {
  const queryOfUpdatePet =
    "UPDATE pets SET namePets = ?, type = ?, color = ?, dietary = ?, weight = ?, height = ?, hypo = ?, adoptionStatus = ?, breed = ?, biography = ?, image = ? WHERE petsId = ?";

  const updateModule = await promiseQuery(queryOfUpdatePet, [
    namePets,
    type,
    color,
    dietary,
    weight,
    height,
    hypo,
    adoptionStatus,
    breed,
    biography,
    image,
    petsId,
  ]);

  return updateModule;
}

export default {
  getPet,
  addPets,
  getPets,
  searchPets,
  update,
  adopt,
  fostered,
  save,
  returnAgency,
  getMyAdoptedPet,
  getMyFosteredPet,
  getMySavedPet,
  unSave,
  getPetsFromUser,
  deletePet,
};
