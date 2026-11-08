import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Projects } from "@/components/site/Projects";
import { Stack } from "@/components/site/Stack";
import { Journey } from "@/components/site/Journey";
import { Contact } from "@/components/site/Contact";
import { Island } from "@/components/site/Island";
import { Sparks } from "@/components/site/Sparks";

export default function Home() {
  return (
    <Sparks>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Island />
    </Sparks>
  );
}
