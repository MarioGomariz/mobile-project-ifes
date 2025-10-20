import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
}

export const authService = {
  // Registrar nuevo usuario
  async register(email: string, password: string, displayName: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar el perfil del usuario
      await updateProfile(user, { displayName });

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName,
        createdAt: new Date()
      });

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Iniciar sesión
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Obtener datos del usuario desde Firestore
  async getUserData(uid: string): Promise<UserData | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return auth.currentUser;
  }
};
