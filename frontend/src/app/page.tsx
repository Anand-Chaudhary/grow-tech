"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  Hero,
  ProjectsInMotion,
  WhatWeDo,
  Manifesto,
  ContactSection,
  Footer,
} from "@/component/landing";
import { getLandingData, LandingPageData } from "@/lib/api";

export default function Home() {
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);

  useEffect(() => {
    let isMounted = true;

    getLandingData()
      .then((data) => {
        if (isMounted && data) {
          setLandingData(data);
        }
      })
      .catch((err) => {
        console.warn("[Landing Page] Failed to fetch landing data:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF6EC] selection:bg-[#3D9129]/20 selection:text-[#243629]">
      {/* Floating Pill Header with top social bar */}
      <Navbar />

      {/* Hero with iconic 3D curve marquee and 3-column action footer */}
      <Hero hero={landingData?.hero} />

      {/* Projects in motion section with olive mockups and cream banners */}
      <ProjectsInMotion projects={landingData?.projects} />

      {/* What we do 2x2 grid with green numerals */}
      <WhatWeDo services={landingData?.services} />

      {/* Design and tech manifesto statement */}
      <Manifesto manifesto={landingData?.manifesto} />

      {/* Have an idea? Let's build it contact section */}
      <ContactSection contact={landingData?.contact} />

      {/* Clean footer with Grow Tech logo */}
      <Footer />
    </main>
  );
}