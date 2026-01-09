import type { FC } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import AppRoutes from "./routes";

const App: FC = () => (
	<ThemeProvider defaultTheme="light" storageKey="app-ui-theme">
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<AppRoutes />
		</TooltipProvider>
	</ThemeProvider>
);

export default App;
