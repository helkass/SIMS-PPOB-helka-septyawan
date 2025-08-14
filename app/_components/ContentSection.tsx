import Link from "next/link";
import React from "react";

interface IcontentSection {
  title: string;
  allHref?: string;
  children: React.ReactNode;
  contentClass?: string;
}

const ContentSection = ({
  title,
  allHref,
  children,
  contentClass = "",
}: IcontentSection) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <strong>{title}</strong>
        {allHref && (
          <Link href={allHref} className="text-red-400 text-sm">
            Lihat Semua
          </Link>
        )}
      </div>
      <div className={contentClass}>{children}</div>
    </section>
  );
};

export default ContentSection;
