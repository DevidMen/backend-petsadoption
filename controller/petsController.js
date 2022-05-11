import userModel from "../models/userModel.js";
import petModel from "../models/petModel.js";

async function update(req, res, next) {
  const {
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
    email,
  } = req.body;
  const petsId = req.params.petsId;

  try {
    const user = await userModel.checkAdmin(email);

    if (!user) {
      res.status(401).send({ message: "You are not admin!" });
    } else {
      const updateThePet = await petModel.update(
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
      );
      if (updateThePet) {
        res.status(200).json({
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
          message: "Pet update succesfull",
        });
      } else {
        res.status(401).send("Something wrong");
      }
    }
  } catch (err) {
    next(err);
  }
}

async function unSave(req, res, next) {
  const { email } = req.body;
  const petsId = req.params.petsId;

  try {
    const result = await petModel.unSave(email, petsId);
    if (result) {
      res.status(200).json({ result, message: "Pet unsaved succesfull" });
    } else {
      res.status(400).json({ message: "Something wrong!" });
    }
  } catch (err) {
    next(err);
  }
}

async function getMyPet(req, res, next) {
  const { email } = req.params;

  try {
    const savedPetResult = await petModel.getMySavedPet(email);
    const ownerPetResult = await petModel.getMyAdoptedPet(email);
    const fosteredPetResult = await petModel.getMyFosteredPet(email);
    if (savedPetResult || ownerPetResult || fosteredPetResult) {
      res
        .status(200)
        .json({ savedPetResult, ownerPetResult, fosteredPetResult });
    }
  } catch (err) {
    next(err);
  }
}

async function getPetsFromUser(req, res, next) {
  const email = req.params.email;
  const adminEmail = req.query.email;

  try {
    const user = await userModel.checkAdmin(adminEmail);

    if (!user) {
      res.status(401).send({ message: "You are not admin!" });
    } else {
      const result = await petModel.getPetsFromUser(email);
      if (result) {
        res.status(200).json({ result, message: "Pet edit is done" });
      } else {
        res.status(401).send("Something wrong");
      }
    }
  } catch (err) {
    next(err);
  }
}

async function deletePet(req, res, next) {

  const {email}  = req.body;
  const petsId = req.params.petsId;

  try {
    const user = await userModel.checkAdmin(email);

    if (!user) {
      res.status(401).send({ message: "You are not admin!" });
    } else {
      const result = await petModel.deletePet(petsId);
      if (result) {
        res.status(200).json({ result , message: "Pet delete" });
      } else {
        res.status(401).send("Something wrong");
      }
    }
  } catch (err) {
    next(err);
  }
}

async function getPets(req, res, next) {
  const { email } = req.query;
  try {
    const user = await userModel.checkAdmin(email);

    if (!user) {
      res.status(401).send({ message: "not admin" });
    } else {
      const result = await petModel.getPets();
      if (result) {
        res.status(200).json({ result });
      }
    }
  } catch (err) {
    next(err);
  }
}

async function getPet(req, res, next) {
  const petsId = req.params.petsId;
  try {
    const result = await petModel.getPet(petsId);
    if (result) {
      res.status(200).json({ result });
    } else {
      res.status(400).json({ message: "Something wrong!" });
    }
  } catch (err) {
    next(err);
  }
}

async function fostered(req, res, next) {
  const petsId = req.params.petsId;
  const email = req.body;
  const finalEmail = String(Object.keys(email)[0]);

  try {
    const result = await petModel.fostered(finalEmail, petsId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "Something wrong!" });
    }
  } catch (err) {
    next(err);
  }
}

async function adopt(req, res, next) {
  const petsId = req.params.petsId;
  const email = req.body;
  const finalEmail = String(Object.keys(email)[0]);

  try {
    const result = await petModel.adopt(finalEmail, petsId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "Something wrong!" });
    }
  } catch (err) {
    next(err);
  }
}

async function save(req, res, next) {
  const petsId = req.params.petsId;
  const email = req.body;
  const finalEmail = String(Object.keys(email)[0]);

  try {
    const result = await petModel.save(finalEmail, petsId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "Something wrong!" });
    }
  } catch (err) {
    next(err);
  }
}

async function returnAgency(req, res, next) {
  const petsId = req.params.petsId;
  const email = req.body;
  const finalEmail = String(Object.keys(email)[0]);

  try {
    const result = await petModel.returnAgency(finalEmail, petsId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "Something wrong!" });
    }
  } catch (err) {
    next(err);
  }
}

async function searchPets(req, res, next) {
  const {
    searchType,
    searchName,
    searchHeigth,
    searchWeigth,
    searchAdoptionStatus,
  } = req.query;

  try {
    const petsFound = await petModel.searchPets(
      searchType,
      searchName,
      searchHeigth,
      searchWeigth,
      searchAdoptionStatus
    );

    if (petsFound.length) {
      res.status(200).send(petsFound);
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (err) {
    next(err);
  }
}

async function addPets(req, res, next) {
  const {
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
  } = req.body;

  try {
    const user = await userModel.checkAdmin(req.body.email);

    if (!user) {
      res.status(401).send({ message: "not admin" });
    } else {
      const addpets = await petModel.addPets(
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
      );
      if (addpets) {
        res
          .status(200)
          .json({
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
            message: "Pet add with success!",
          });
      }
    }
  } catch (err) {
    next(err);
  }
}

export default {
  addPets,
  searchPets,
  returnAgency,
  update,
  unSave,
  getMyPet,
  getPetsFromUser,
  getPets,
  getPet,
  fostered,
  adopt,
  deletePet,
  save,
};
