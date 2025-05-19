import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  BookOpen,
  FileText,
  Link2,
  MessageSquare,
  Package,
  Settings,
  User,
  HelpCircle,
  RefreshCw,
  Headphones,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const [selectedSite] = useState("amazon.com")
  const [isArticlesOpen, setIsArticlesOpen] = useState(true) 
  const [selectedArticle, setSelectedArticle] = useState("Generated Article") 

  const toggleArticles = () => setIsArticlesOpen((prev) => !prev)

  const articleItems = [
    "Create Article",
    "Generated Article",
    "Keyword Projects",
    "AI Keyword to Article",
    "Steal Competitor Keyword",
    "Import Keyword From GSC",
    "Manual Keyword to Article",
    "Bulk Keyword to Article",
    "Longtail Keyword to Article",
    "Article Settings",
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center px-2 py-3">
          <h2 className="text-xl font-bold">abun</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2">
          <Avatar className="h-8 w-8 bg-primary">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium">{selectedSite}</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            onClick={toggleArticles}
            className="cursor-pointer hover:bg-muted/50 px-3 flex items-center gap-2" 
          >
            <FileText className="h-4 w-4 text-blue-600 " />
            <span className="text-sm">Articles</span>
          </SidebarGroupLabel>

          {isArticlesOpen && (
            <SidebarGroupContent className="pl-4 border-l-2 border-gray-500">
              <SidebarMenu>
                {articleItems.map((item) => (
                  <SidebarMenuItem key={item}>
                    <SidebarMenuButton
                      onClick={() => setSelectedArticle(item)}
                      className={`cursor-pointer ${
                        selectedArticle === item ? "text-blue-600 font-semibold hover:text-blue-600" : ""
                      }`}
                    >
                      {item}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        <SidebarMenu>
          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/auto-blog"}>
              <Link to="/auto-blog">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span>Auto Blog</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/internal-links"}>
              <Link to="/internal-links">
                <Link2 className="h-4 w-4 text-blue-600" />
                <span>Internal Links</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/free-backlinks"}>
              <Link to="/free-backlinks">
                <Link2 className="h-4 w-4 text-blue-600" />
                <span>Free Backlinks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/integrations"}>
              <Link to="/integrations">
                <Package className="h-4 w-4 text-blue-600" />
                <span>Integrations</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/subscription"}>
              <Link to="/subscription">
                <User className="h-4 w-4 text-blue-600" />
                <span>Subscription</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/affiliate-program"}>
              <Link to="/affiliate-program">
                <User className="h-4 w-4 text-blue-600" />
                <span>Affiliate Program</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/help-center"}>
              <Link to="/help-center">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                <span>Help Center</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/updates"}>
              <Link to="/updates">
                <RefreshCw className="h-4 w-4 text-blue-600" />
                <span>Updates</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/live-chat-support"}>
              <Link to="/live-chat-support">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <span>Live Chat Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="cursor-pointer hover:bg-muted/50 px-3">
            <SidebarMenuButton asChild isActive={pathname === "/profile"}>
              <Link to="/profile">
                <User className="h-4 w-4 text-blue-600" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Support</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
