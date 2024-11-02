import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Upload, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export const ImageUpload = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (files: FileList | null) => {
    if (!files || !files[0]) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `images/${user?.uid}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'images'), {
        userId: user?.uid,
        url: downloadURL,
        filename: file.name,
        createdAt: serverTimestamp(),
      });

      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <label 
        className={`glass-card relative flex flex-col items-center px-6 py-8 rounded-xl cursor-pointer
                   ${dragActive ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]' : ''}
                   transition-all duration-300`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleUpload(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-20 rounded-full" />
          {uploading ? (
            <div className="animate-spin">
              <Upload className="w-10 h-10 text-cyan-400" />
            </div>
          ) : (
            <ImageIcon className="w-10 h-10 text-cyan-400" />
          )}
        </div>
        <p className="mt-4 text-lg text-white">
          {uploading ? 'Uploading...' : 'Drop your image here or click to browse'}
        </p>
        <p className="mt-2 text-sm text-white/60">
          Supports: JPG, PNG, GIF
        </p>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleUpload(e.target.files)}
          disabled={uploading}
        />
      </label>
    </div>
  );
};