import React from "react";
import {
  Navbar,
  Hero,
  ProjectsInMotion,
  WhatWeDo,
  Manifesto,
  ContactSection,
  Footer,
} from "@/component/landing";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF6EC] selection:bg-[#3D9129]/20 selection:text-[#243629]">
      {/* Floating Pill Header with top social bar */}
      <Navbar />

      {/* Hero with iconic 3D curve marquee and 3-column action footer */}
      <Hero />

      {/* Projects in motion section with olive mockups and cream banners */}
      <ProjectsInMotion />

      {/* What we do 2x2 grid with green numerals */}
      <WhatWeDo />

      {/* Design and tech manifesto statement */}
      <Manifesto />

      {/* Have an idea? Let's build it contact section */}
      <ContactSection />

      {/* Clean footer with Grow Tech logo */}
      <Footer />
    </main>
  );
}