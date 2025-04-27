import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "A password deve conter no mínimo 6 caracteres" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email já existe" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Dados inválidos" });
    }
  } catch (error) {
    console.log("Erro no método signup", error.message);
    res.status(500).json({ message: "Erro de servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Erro no método login", error.message);
    res.status(500).json({ message: "Erro de servidor" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout feito com sucesso" });
  } catch (error) {
    console.log("Erro no método logout", error.message);
    res.status(500).json({ message: "Erro de servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, password, profilePic, bio } = req.body;
    const userId = req.user._id;

    // Verificar se há pelo menos um campo para atualizar
    if (!fullName && !password && !profilePic && !bio) {
      return res.status(400).json({ message: "Escolha pelo menos um campo para atualizar" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const updateData = {};

    if (fullName) {
      updateData.fullName = fullName;
    }

    if (profilePic) {
      if (user.profilePic) {
        const publicId = user.profilePic.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadResponse.secure_url;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    if (bio) {
      updateData.bio = bio;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Erro no método updateProfile", error.message);
    res.status(500).json({ message: "Erro de servidor" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (user.profilePic) {
      const publicId = user.profilePic.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.log("Erro no método deleteProfile", error.message);
    res.status(500).json({ message: "Erro de servidor" });
  }
};

// export const getUserProfile = async (req, res) => {
//   const {userId} = req.params;

//   try {
//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "Usuário não encontrado" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.log("Erro no método getUserProfile", error.message);
//     res.status(500).json({ message: "Erro de servidor" });
    
//   }
// }

export const getUserProfile = async (req, res) => {
  const { id } = req.params; // Corrigido de userId para id conforme definido na rota

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("Erro no método getUserProfile", error.message);
    res.status(500).json({ message: "Erro de servidor" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Erro no método checkAuth", error.message);
    res.status(500).json({ message: "Erro de servidor" });
  }
};
