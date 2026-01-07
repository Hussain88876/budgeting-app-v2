import FinanceLogo from '@/app/ui/finance-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-20">
        <FinanceLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to FinanceFlow.</strong> Track your spending, manage categories, and stay on top of your finances.
          </p><div className="text-gray-600">
            <p className="mb-4">
              <strong>Interactive Demo & Portfolio Video</strong>
            </p>
            <p className="mb-4 text-base">
              This application demonstrates the architecture and user experience of a modern <strong>Personal Finance SaaS</strong>.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm md:text-base">
              <li>
                <strong>Purpose:</strong> A practical showcase of advanced frontend patterns, including complex state management and responsive design.
              </li>
              <li>
                <strong>Tech Stack:</strong> Built with <strong>Next.js</strong> and <strong>TypeScript</strong> to highlight type safety, performance, and modern web development practices.
              </li>
              <li>
                <strong>Context:</strong> Created as a &apos;playground&apos; project to experiment with TDD and new features, serving as a live example of my technical capabilities.
              </li>
            </ul>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/finance-dashboard.png"
            width={1000}
            height={760}
            className="hidden md:block rounded-lg shadow-xl"
            alt="Screenshots of the finance dashboard"
          />
          <Image
            src="/finance-dashboard.png"
            width={560}
            height={620}
            className="block md:hidden rounded-lg shadow-xl"
            alt="Screenshots of the finance dashboard mobile version"
          />
        </div>
      </div>
    </main>
  );
}
