import { DollarSign, FileText, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthUser } from "../../../hooks/auth/useAuth";

const Dashboard = () => {
	const user = useAuthUser();

	const stats = [
		{
			title: "Total Users",
			value: "2,543",
			change: "+12%",
			icon: Users,
			color: "text-blue-600",
		},
		{
			title: "Total Posts",
			value: "1,234",
			change: "+8%",
			icon: FileText,
			color: "text-green-600",
		},
		{
			title: "Page Views",
			value: "45.2K",
			change: "+23%",
			icon: TrendingUp,
			color: "text-amber-600",
		},
		{
			title: "Revenue",
			value: "$12,543",
			change: "+15%",
			icon: DollarSign,
			color: "text-blue-600",
		},
	];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
				<p className="text-muted-foreground">
					{user
						? `Welcome back, ${user.name}! Here's what's happening.`
						: "Welcome! Here's what's happening."}
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Card
						key={stat.title}
						className="border-0 shadow-sm hover:shadow-md transition-shadow"
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								{stat.title}
							</CardTitle>
							<stat.icon className={`h-5 w-5 ${stat.color}`} />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stat.value}</div>
							<p className="text-xs text-green-600">
								{stat.change} from last month
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
