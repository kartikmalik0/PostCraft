"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Download, Image as ImageIcon, ThumbsUp, MessageSquare, Repeat, Send, Globe, Sun, Moon, Palette, Repeat2 } from "lucide-react"
import { toPng } from 'html-to-image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

export default function LinkedInTemplate() {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    title: "Product Manager | Tech Enthusiast | Speaker",
    avatar: "/placeholder.svg?height=60&width=60",
    timeAgo: "2h",
  })

  const [content, setContent] = useState(
    "I'm excited to share that our team just launched a new feature that will revolutionize how you interact with our platform! 🚀\n\nAfter months of hard work and collaboration, we've created something truly special. I'm incredibly proud of what we've accomplished.\n\n#ProductDevelopment #Innovation #TechNews",
  )

  const [likes, setLikes] = useState("243")
  const [comments, setComments] = useState("37")
  const [reposts, setReposts] = useState("18")
  const [darkMode, setDarkMode] = useState(false)

  const postRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile({
          ...profile,
          avatar: e.target?.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadPost = useCallback(() => {
    if (postRef.current === null) {
      return
    }

    toPng(postRef.current, {
      cacheBust: true,
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: darkMode ? "#1a1a1a" : "#f3f2ef"
    })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'linkedin-post.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log('Error generating image:', err)
      })
  }, [darkMode])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
      {/* Editor Panel */}
      <div className="xl:col-span-2 space-y-6">
        <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="h-5 w-5 text-blue-500" />
                Profile Settings
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                      <Label htmlFor="dark-mode" className="cursor-pointer">
                        {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      </Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle post theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title/Headline
                </Label>
                <Input
                  id="title"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeAgo" className="text-sm font-medium">
                    Posted Time
                  </Label>
                  <Input
                    id="timeAgo"
                    value={profile.timeAgo}
                    onChange={(e) => setProfile({ ...profile, timeAgo: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar" className="text-sm font-medium">
                    Profile Picture
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                    />
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-border">
                      <img
                        src={profile.avatar || "/placeholder.svg"}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Post Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="resize-none"
                placeholder="Write your LinkedIn post..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="likes" className="text-sm font-medium">
                  Likes
                </Label>
                <Input id="likes" value={likes} onChange={(e) => setLikes(e.target.value)} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments" className="text-sm font-medium">
                  Comments
                </Label>
                <Input id="comments" value={comments} onChange={(e) => setComments(e.target.value)} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reposts" className="text-sm font-medium">
                  Reposts
                </Label>
                <Input id="reposts" value={reposts} onChange={(e) => setReposts(e.target.value)} className="h-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={downloadPost} className="w-full h-12 text-base font-medium" size="lg">
          <Download className="mr-2 h-5 w-5" /> Download Post
        </Button>
      </div>

      {/* Preview Panel */}
      <div className="xl:col-span-3 flex items-start justify-center">
        <div className="w-full max-w-lg">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
            <p className="text-sm text-muted-foreground">Your post will look exactly like this</p>
          </div>
          <div className="bg-gradient-to-br from-muted/30 to-muted/60 p-6 rounded-2xl">
            <div
              className={`w-full rounded-xl shadow-xl overflow-hidden ${darkMode ? "bg-[#1a1a1a] text-white" : "bg-[#f3f2ef] text-black"}`}
              ref={postRef}
            >
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                    <img
                      src={profile.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-base ${darkMode ? "text-white" : "text-[#000000]"}`}>
                      {profile.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>{profile.title}</p>
                    <p
                      className={`text-xs flex items-center gap-1 mt-1 ${darkMode ? "text-gray-400" : "text-[#666666]"}`}
                    >
                      {profile.timeAgo} • <Globe className="h-3 w-3" />
                    </p>
                  </div>
                  <div className={`${darkMode ? "text-gray-400" : "text-[#666666]"}`}>
                    <p className="text-[10px]">•••</p>
                  </div>
                </div>

                <div
                  className={`mb-4 whitespace-pre-line text-[15px] leading-relaxed ${darkMode ? "text-white" : "text-[#000000]"}`}
                >
                  {content}
                </div>

                <Separator className={darkMode ? "bg-gray-800" : "bg-gray-200"} />

                <div className="py-3 flex justify-between">
                  <div className={`flex items-center text-sm gap-1 ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>
                    <span className="inline-flex items-center">
                      <span className="inline-block h-4 w-4 rounded-full  bg-white text-white items-center justify-center text-[10px]">
                        <Image width={100} height={100} src={"/linkedin-like.svg"} alt={""} />
                      </span>
                      <span className="inline-block h-4 w-4 rounded-full bg-white  text-white items-center justify-center text-[10px] -ml-1">
                        <Image width={100} height={100} src={"/linkedin-love.svg"} alt={""} />
                      </span>
                      <span className="inline-block h-4 w-4 rounded-full bg-white text-white items-center justify-center text-[10px] -ml-1">
                        <Image width={100} height={100} src={"/linkedin-support.svg"} alt={""} />
                      </span>
                    </span>
                    <span>{likes}</span>
                  </div>
                  <div className={`flex items-center text-sm gap-1 ${darkMode ? "text-gray-300" : "text-[#666666]"}`}>
                    <span>{comments} comments</span>
                    <span>•</span>
                    <span>{reposts} reposts</span>
                  </div>
                </div>

                <Separator className={darkMode ? "bg-gray-800" : "bg-gray-200"} />

                <div className="flex justify-between py-2">
                  <button
                    className={`flex items-center gap-2 text-sm py-3 px-4 rounded-lg transition-colors ${darkMode ? "text-gray-300 hover:bg-gray-800" : "text-[#666666] hover:bg-[#e0e0e0]"}`}
                  >
                    <ThumbsUp className="h-4 w-4" /> Like
                  </button>
                  <button
                    className={`flex items-center gap-2 text-sm py-3 px-4 rounded-lg transition-colors ${darkMode ? "text-gray-300 hover:bg-gray-800" : "text-[#666666] hover:bg-[#e0e0e0]"}`}
                  >
                    <MessageSquare className="h-4 w-4" /> Comment
                  </button>
                  <button
                    className={`flex items-center gap-2 text-sm py-3 px-4 rounded-lg transition-colors ${darkMode ? "text-gray-300 hover:bg-gray-800" : "text-[#666666] hover:bg-[#e0e0e0]"}`}
                  >
                    <Repeat2 className="h-4 w-4" /> Repost
                  </button>
                  <button
                    className={`flex items-center gap-2 text-sm py-3 px-4 rounded-lg transition-colors ${darkMode ? "text-gray-300 hover:bg-gray-800" : "text-[#666666] hover:bg-[#e0e0e0]"}`}
                  >
                    <Send className="h-4 w-4" /> Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}