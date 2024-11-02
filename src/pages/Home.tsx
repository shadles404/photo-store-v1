import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ImageUpload } from '../components/ImageUpload';
import { ImageGallery } from '../components/ImageGallery';
import { Camera, Shield, Zap, Image as ImageIcon } from 'lucide-react';

export const Home = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Camera className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">PhotoVault</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white/80 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold">
                <span className="text-blue-400">The Future</span>{' '}
                <span className="text-purple-400">of</span>
                <br />
                <span className="text-white">Photo Storage</span>
              </h1>
              <p className="mt-6 text-xl text-white/80 max-w-2xl mx-auto">
                Experience the next generation of secure photo management with
                advanced AI features and quantum-grade encryption
              </p>
              <Link
                to="/signup"
                className="mt-8 inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Get Started Free
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
                <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 transition-transform duration-300 group-hover:-translate-y-1">
                  <Camera className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Upload</h3>
                  <p className="text-white/60">Smart categorization and tagging with advanced AI recognition</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
                <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 transition-transform duration-300 group-hover:-translate-y-1">
                  <Shield className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Quantum Security</h3>
                  <p className="text-white/60">Military-grade encryption with zero-knowledge privacy</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
                <div className="relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 transition-transform duration-300 group-hover:-translate-y-1">
                  <ImageIcon className="h-12 w-12 text-pink-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Neural Processing</h3>
                  <p className="text-white/60">Advanced image enhancement and restoration capabilities</p>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-24 text-center">
              <p className="text-white/60 mb-8">Trusted by photographers worldwide</p>
              <div className="flex justify-center space-x-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-24 h-12 rounded-lg bg-white/10 backdrop-blur-sm animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ImageUpload />
      <ImageGallery />
    </div>
  );
};