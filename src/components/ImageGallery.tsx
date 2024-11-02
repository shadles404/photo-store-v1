import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface Image {
  id: string;
  url: string;
  filename: string;
  createdAt: any;
}

export const ImageGallery = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'images'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imageData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Image[];
      setImages(imageData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (image: Image) => {
    try {
      await deleteDoc(doc(db, 'images', image.id));
      const storageRef = ref(storage, `images/${user?.uid}/${image.filename}`);
      await deleteObject(storageRef);
      toast.success('Image deleted successfully');
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {images.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center text-white/60 py-12">
          <ImageIcon className="h-16 w-16 mb-4" />
          <p className="text-lg">No images yet. Upload your first image!</p>
        </div>
      ) : (
        images.map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-xl hover-glow">
            <img
              src={image.url}
              alt={image.filename}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm truncate mb-2">{image.filename}</p>
                <button
                  onClick={() => handleDelete(image)}
                  className="text-white/80 hover:text-red-400 transition-colors duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};