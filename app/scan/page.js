"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload } from "lucide-react";

export default function WardrobeScanPage() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Wardrobe Scan
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Scan Your Wardrobe</CardTitle>
              <CardDescription>
                Use your camera to scan and digitize your clothes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Camera className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={startScan}
                disabled={scanning}
              >
                {scanning ? "Scanning..." : "Start Scan"}
              </Button>
              {scanning && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-center">{progress}% Complete</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Images</CardTitle>
              <CardDescription>
                Manually upload images of your clothes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
                  <Upload className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" accept="image/*" />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/wardrobe">
                <Button className="w-full">Upload Image</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
