"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-heading" className="section-y relative">
      <div className="shell">
        <SectionHeading
          id="credentials-heading"
          index="06"
          eyebrow="Constellation of knowledge"
          title="Formal training,"
          accentWord="verified"
          description="The engineering programme I am in now, the diploma the practice was built on, and the certifications completed along the way."
        />

        <div className="mt-16">
          <Education />
        </div>

        <div className="mt-16">
          <Certifications />
        </div>
      </div>
    </section>
  );
}
