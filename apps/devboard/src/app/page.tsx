"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layout, Shield, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] font-sans selection:bg-primary-200 selection:text-primary-900 dark:selection:bg-primary-900 dark:selection:text-primary-100 overflow-hidden transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/30">
              <Layout className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">TaskVault</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/signin" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              href="/signin" 
              className="text-sm font-medium bg-primary-600 text-white px-5 py-2.5 rounded-full hover:bg-primary-700 transition-all shadow-md hover:shadow-lg shadow-primary-600/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute top-0 -left-10 w-[400px] h-[400px] bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 animate-blob" />
          <div className="absolute top-0 -right-10 w-[400px] h-[400px] bg-primary-400 dark:bg-primary-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-20 w-[400px] h-[400px] bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="text-center relative z-10 animate-slide-up">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 border border-primary-100 dark:border-primary-500/20 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse"></span>
              TaskVault 2.0 is now live
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
              Manage your tasks with <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">
                unmatched clarity.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              The modern workspace for high-performing teams. Organize, track, and conquer your projects with our intelligent kanban boards and snippet vaults.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/signin" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Start building free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#features" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-900 dark:text-white bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm rounded-full hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
              >
                View Features
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-24 relative mx-auto max-w-5xl group"
        >
          {/* Mockup Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-2xl shadow-2xl p-2 sm:p-4">
            <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-zinc-900/50 aspect-[16/9] relative group">
              <Image 
                src="/dashboard-preview.png"
                alt="TaskVault Dashboard Preview"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 dark:bg-[#0f0f0f] py-24 sm:py-32 border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-base font-bold text-primary-600 dark:text-primary-400 tracking-wide uppercase mb-3">Features</h2>
            <p className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Everything you need to ship faster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm hover:shadow-xl dark:shadow-none dark:hover:bg-zinc-800/80 border border-gray-100 dark:border-white/5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Layout className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Intuitive Kanban</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Drag, drop, and manage tasks with zero friction. Our boards are designed for maximum productivity and clarity.</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm hover:shadow-xl dark:shadow-none dark:hover:bg-zinc-800/80 border border-gray-100 dark:border-white/5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Snippet Vault</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Store and reuse your most valuable code snippets instantly. Stop searching through old repositories.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm hover:shadow-xl dark:shadow-none dark:hover:bg-zinc-800/80 border border-gray-100 dark:border-white/5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure by Default</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Enterprise-grade Firebase security out of the box. Your data, tasks, and snippets are always protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/5 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400 font-medium">TaskVault © 2026</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
