// pages/index.tsx or app/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle, Satellite } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the Map component (client-side only)
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white px-4 py-8">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">QuakeAlert</h1>
        <p className="text-xl md:text-2xl text-slate-300">Real-time earthquake detection and alerts powered by smart sensors and AI.</p>
      </header>

      <section className="max-w-5xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2">
        <Card className="bg-slate-700 border border-slate-600">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-orange-400 mr-2" />
              <h2 className="text-xl font-semibold">Live Earthquake Map</h2>
            </div>
            <div className="h-64 rounded-xl overflow-hidden">
              <Map />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border border-slate-600">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-400 mr-2" />
              <h2 className="text-xl font-semibold">Latest Alerts</h2>
            </div>
            <ul className="text-slate-300 space-y-2">
              <li>🔔 3.2M – Tokyo, Japan – 2 mins ago</li>
              <li>🔔 4.7M – Santiago, Chile – 10 mins ago</li>
              <li>🔔 2.9M – Los Angeles, CA – 15 mins ago</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-slate-700 p-4 rounded-xl shadow">
            <Satellite className="text-blue-400 w-6 h-6 mb-2" />
            <h3 className="font-semibold mb-1">Smart Sensors</h3>
            <p className="text-slate-300">Detect tremors instantly and stream real-time data to the cloud.</p>
          </div>
          <div className="bg-slate-700 p-4 rounded-xl shadow">
            <AlertCircle className="text-yellow-400 w-6 h-6 mb-2" />
            <h3 className="font-semibold mb-1">AI Detection</h3>
            <p className="text-slate-300">Machine learning analyzes patterns to detect early signs of earthquakes.</p>
          </div>
          <div className="bg-slate-700 p-4 rounded-xl shadow">
            <MapPin className="text-green-400 w-6 h-6 mb-2" />
            <h3 className="font-semibold mb-1">Instant Alerts</h3>
            <p className="text-slate-300">Alerts are sent via SMS, email, and push notifications within seconds.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Informed</h2>
        <p className="text-slate-300 mb-6">Sign up for alerts and stay ahead of seismic activity near you.</p>
        <Button className="text-lg px-6 py-3 bg-orange-500 hover:bg-orange-600">Get Alerts</Button>
      </section>

      <footer className="text-center text-slate-500 mt-20 text-sm">
        © 2025 QuakeAlert. Powered by AI and open seismic data.
      </footer>
    </div>
  );
}
