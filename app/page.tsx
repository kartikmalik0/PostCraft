import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LinkedInTemplate from "@/components/linkedin-template"
import XTemplate from "@/components/x-template"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Star, Github, Sparkles, Download, Edit3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VibePost
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href={"https://github.com/kartikmalik0/VibePost"} target="_blank">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Github className="h-4 w-4 mr-2" />
                <Star className="h-3 w-3 mr-1" />
                Star on GitHub
              </Button>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            ✨ Free & Open Source
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            Create Stunning
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Social Media Posts
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Design professional LinkedIn and X (Twitter) posts that look exactly like the real thing. Customize
            everything and download instantly.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm border rounded-full px-4 py-2">
              <Edit3 className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Easy Editing</span>
            </div>
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm border rounded-full px-4 py-2">
              <Download className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Instant Download</span>
            </div>
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm border rounded-full px-4 py-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Pixel Perfect</span>
            </div>
          </div>

          {/* Preview Images */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3 text-blue-600">LinkedIn Posts</h3>
              <div className="bg-[#f3f2ef] rounded-lg p-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="h-3 w-20 bg-gray-400 rounded mb-1"></div>
                    <div className="h-2 w-32 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-gray-300 rounded"></div>
                  <div className="h-2 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-2 w-1/2 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3">X (Twitter) Posts</h3>
              <div className="bg-black rounded-lg p-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
                  <div>
                    <div className="h-3 w-20 bg-gray-400 rounded mb-1"></div>
                    <div className="h-2 w-24 bg-gray-500 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-gray-400 rounded"></div>
                  <div className="h-2 w-2/3 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main App */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="linkedin" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-12 p-1 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger
                  value="linkedin"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <div className="h-4 w-4 bg-blue-600 rounded"></div>
                  LinkedIn
                </TabsTrigger>
                <TabsTrigger
                  value="x"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <div className="h-4 w-4 bg-black dark:bg-white rounded"></div>X (Twitter)
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="linkedin" className="mt-0">
              <LinkedInTemplate />
            </TabsContent>
            <TabsContent value="x" className="mt-0">
              <XTemplate />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="font-medium">VibePost</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href={"https://github.com/kartikmalik0/VibePost"} target="_blank">
                <Button variant="ghost" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} VibePost. Made with ❤️</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
