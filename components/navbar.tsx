"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-xl font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            Tirthan Valley
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href="/"
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    pathname === "/"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                >
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    pathname.startsWith("/explore")
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                >
                  Explore
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
                  <ul className="grid gap-1 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-emerald-500/50 to-emerald-500/20 p-6 no-underline outline-none focus:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                          href="/explore/about"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-gray-900 dark:text-white">
                            About Tirthan Valley
                          </div>
                          <p className="text-sm leading-tight text-gray-600 dark:text-gray-300">
                            Discover the history, culture, and significance of
                            this hidden gem in the Himalayas.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      href="/explore/attractions"
                      title="Attractions"
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Explore the natural wonders and cultural heritage sites.
                    </ListItem>
                    <ListItem
                      href="/explore/stay"
                      title="Places to Stay"
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Find the perfect accommodation for your visit.
                    </ListItem>
                    <ListItem
                      href="/explore/activities"
                      title="Activities & Experiences"
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Discover exciting things to do in Tirthan Valley.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/gallery"
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    pathname === "/gallery"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                >
                  Gallery
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/blog"
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    pathname === "/blog"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                >
                  Blog
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/contact"
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    pathname === "/contact"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="text-xl font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Tirthan Valley
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <div className="flex flex-col space-y-6 mt-8">
                <Link
                  href="/"
                  className={cn(
                    "text-lg font-medium transition-colors",
                    pathname === "/"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <div className="space-y-3">
                  <div className="font-medium text-lg">Explore</div>
                  <div className="pl-4 space-y-3 border-l border-gray-200 dark:border-gray-800">
                    <Link
                      href="/explore/about"
                      className={cn(
                        "block transition-colors",
                        pathname === "/explore/about"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      About Tirthan Valley
                    </Link>
                    <Link
                      href="/explore/attractions"
                      className={cn(
                        "block transition-colors",
                        pathname === "/explore/attractions"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Attractions
                    </Link>
                    <Link
                      href="/explore/stay"
                      className={cn(
                        "block transition-colors",
                        pathname === "/explore/stay"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Places to Stay
                    </Link>
                    <Link
                      href="/explore/activities"
                      className={cn(
                        "block transition-colors",
                        pathname === "/explore/activities"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Activities & Experiences
                    </Link>
                  </div>
                </div>
                <Link
                  href="/gallery"
                  className={cn(
                    "text-lg font-medium transition-colors",
                    pathname === "/gallery"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/blog"
                  className={cn(
                    "text-lg font-medium transition-colors",
                    pathname === "/blog"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "text-lg font-medium transition-colors",
                    pathname === "/contact"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
