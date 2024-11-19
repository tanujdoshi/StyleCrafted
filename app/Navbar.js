import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          StyleCrafted
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link
            href="/recommendations"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >
            Recommendations
          </Link>
          <Link
            href="/calendar"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >
            Calendar
          </Link>
          <Link
            href="/subscription"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >
            Subscription
          </Link>

          <Link
            href="/feedback"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >
            Feedback
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Navigation</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/recommendations">Recommendations</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/wardrobe">My Wardrobe</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/calendar">Calendar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/subscription">Subscription</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
