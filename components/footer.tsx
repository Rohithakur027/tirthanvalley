import Link from "next/link";
import {
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-xl font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Tirthan Valley
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              Discover the serenity of Tirthan Valley – A hidden gem in the
              Himalayas.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/thetirthanvalley/"
                rel="noopener noreferrer"
                target="_blank"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/explore/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  About Tirthan Valley
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/attractions"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Attractions
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/stay"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Places to Stay
                </Link>
              </li>
              <li>
                <Link
                  href="/explore/activities"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Activities & Experiences
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/travel-tips"
                  className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Travel Tips
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  Tirthan Valley, Banjar Tehsil
                  <br />
                  Kullu District, Himachal Pradesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  +91 78078 18119
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">
                  exploretirthanvalley@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-center md:text-left text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Tirthan Valley. All rights
              reserved.
            </p>
            <div className="flex justify-center md:justify-end space-x-4 text-sm">
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
