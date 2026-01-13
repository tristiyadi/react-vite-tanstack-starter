import {
	Bell,
	ChevronDown,
	FileText,
	LayoutDashboard,
	LogOut,
	Menu,
	Search,
	Settings,
	ShieldCheck,
	Users,
	X,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useAuthUser, useLogout } from "@/hooks/auth/useAuth";

const AdminLayout = () => {
	const auth = useContext(AuthContext);
	const user = useAuthUser();
	const logout = useLogout();

	const userInitial = user?.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: "??";
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const location = useLocation();

	const isAuthenticated = auth?.isAuthenticated ?? false;

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	const navItems = [
		{ icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
		{ icon: Users, label: "Users", path: "/admin/users" },
		{ icon: ShieldCheck, label: "Roles", path: "/admin/roles" },
		{ icon: FileText, label: "Posts", path: "/admin/posts" },
		{ icon: Settings, label: "Settings", path: "/admin/settings" },
	];

	const isActive = (path: string) => location.pathname === path;

	return (
		<div className="min-h-screen flex bg-background">
			{/* Sidebar */}
			<aside
				className={`${sidebarOpen ? "w-64" : "w-16"} bg-card border-r border-border transition-all duration-300 flex flex-col`}
			>
				<div className="h-16 flex items-center justify-between px-4 border-b border-border">
					{sidebarOpen && (
						<span className="font-bold text-lg text-foreground">Admin</span>
					)}
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						{sidebarOpen ? (
							<X className="h-4 w-4" />
						) : (
							<Menu className="h-4 w-4" />
						)}
					</Button>
				</div>
				<nav className="flex-1 p-3 space-y-1">
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
								isActive(item.path)
									? "bg-primary text-primary-foreground"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
							}`}
						>
							<item.icon className="h-5 w-5 flex-shrink-0" />
							{sidebarOpen && <span className="font-medium">{item.label}</span>}
						</Link>
					))}
				</nav>
				<div className="p-3 border-t border-border">
					<button
						type="button"
						onClick={logout}
						className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
					>
						<LogOut className="h-5 w-5" />
						{sidebarOpen && <span className="font-medium">Logout</span>}
					</button>
				</div>
			</aside>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Top Header */}
				<header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
					<div className="flex items-center gap-4">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search..." className="pl-10 w-64" />
						</div>
					</div>
					<div className="flex items-center gap-3">
						<ThemeToggle />
						<Button variant="ghost" size="icon" className="relative">
							<Bell className="h-5 w-5" />
							<span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
								3
							</span>
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										<AvatarFallback className="bg-primary text-primary-foreground">
											{userInitial}
										</AvatarFallback>
									</Avatar>
									<span className="font-medium">{user?.name || "User"}</span>
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-destructive" onClick={logout}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex-1 p-6 overflow-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
