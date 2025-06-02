"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Download, Image as ImageIcon, ThumbsUp, MessageCircle, Share, Sun, Moon, Palette, MoreHorizontal, Globe } from "lucide-react"
import { toPng } from 'html-to-image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function FacebookTemplate() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    avatar: "/placeholder.svg?height=60&width=60",
    timeAgo: "2h",
    privacy: "Public",
  })

  const [content, setContent] = useState(
    "Excited to share some amazing news! 🎉 Just launched my new project and couldn't be happier with the results. Thank you to everyone who supported me along the way! 💙\n\nWhat do you think? Let me know in the comments below! 👇\n\n#NewProject #Excited #Grateful #Community"
  )

  const [metrics, setMetrics] = useState({
    likes: "127",
    comments: "23",
    shares: "8",
  })

  const [lightMode, setLightMode] = useState(true)

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
      backgroundColor: lightMode ? '#ffffff' : '#18191a'
    })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'facebook-post.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log('Error generating image:', err)
      })
  }, [lightMode])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
      {/* Editor Panel */}
      <div className="xl:col-span-2 space-y-6">
        <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="h-5 w-5 text-blue-600" />
                Profile Settings
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="light-mode"
                        checked={lightMode}
                        onCheckedChange={setLightMode}
                      />
                      <Label htmlFor="light-mode" className="cursor-pointer">
                        {lightMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
                  <Label htmlFor="privacy" className="text-sm font-medium">
                    Privacy
                  </Label>
                  <Input
                    id="privacy"
                    value={profile.privacy}
                    onChange={(e) => setProfile({ ...profile, privacy: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar" className="text-sm font-medium">
                  Profile Picture
                </Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="flex-1">
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
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Post Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium">
                What's on your mind?
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="resize-none"
                placeholder="What's on your mind?"
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
                <Input
                  id="likes"
                  value={metrics.likes}
                  onChange={(e) => setMetrics({ ...metrics, likes: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments" className="text-sm font-medium">
                  Comments
                </Label>
                <Input
                  id="comments"
                  value={metrics.comments}
                  onChange={(e) => setMetrics({ ...metrics, comments: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shares" className="text-sm font-medium">
                  Shares
                </Label>
                <Input
                  id="shares"
                  value={metrics.shares}
                  onChange={(e) => setMetrics({ ...metrics, shares: e.target.value })}
                  className="h-10"
                />
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

          <div
            ref={postRef}
            className={`w-full rounded-xl shadow-xl overflow-hidden ${lightMode ? "bg-white text-black" : "bg-[#18191a] text-white"}`}
          >
            {/* Facebook Post Header */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={profile.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-[15px] ${lightMode ? "text-[#1c1e21]" : "text-[#e4e6ea]"}`}>
                      {profile.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <p className={`text-[13px] ${lightMode ? "text-[#65676b]" : "text-[#b0b3b8]"}`}>
                        {profile.timeAgo} ·
                      </p>
                      <Globe className={`h-3 w-3 ${lightMode ? "text-[#65676b]" : "text-[#b0b3b8]"}`} />
                    </div>
                  </div>
                </div>
                <MoreHorizontal className={`h-5 w-5 ${lightMode ? "text-[#65676b]" : "text-[#b0b3b8]"}`} />
              </div>

              {/* Post Content */}
              <div className={`mb-4 text-[15px] leading-[1.33] whitespace-pre-line ${lightMode ? "text-[#1c1e21]" : "text-[#e4e6ea]"}`}>
                {content}
              </div>

              {/* Engagement Stats */}
              <div className={`flex items-center justify-between py-2 border-t border-b ${lightMode ? "border-[#dadde1]" : "border-[#3a3b3c]"}`}>
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    <div className="h-[18px] w-[18px] bg-[#1877f2] rounded-full flex items-center justify-center">
                      <ThumbsUp className="h-[10px] w-[10px] text-white fill-current" />
                    </div>
                  </div>
                  <span className={`text-[15px] ${lightMode ? "text-[#65676b]" : "text-[#b0b3b8]"}`}>
                    {metrics.likes}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[15px] ${lightMode ? "text-[#65676b]" : "text-[#b0b3b8]"}`}>
                    {metrics.comments} comments
                  </span>
                  <span className={`text-[15px] ${lightMode ? "text-[#65676b]" : "text-[#b0b3b8]"}`}>
                    {metrics.shares} shares
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between py-2">
                <button className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${lightMode ? "text-[#65676b] hover:bg-[#f2f3f5]" : "text-[#b0b3b8] hover:bg-[#3a3b3c]"}`}>
                  <ThumbsUp className="h-5 w-5" />
                  <span className="text-[15px] font-semibold">Like</span>
                </button>
                <button className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${lightMode ? "text-[#65676b] hover:bg-[#f2f3f5]" : "text-[#b0b3b8] hover:bg-[#3a3b3c]"}`}>
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-[15px] font-semibold">Comment</span>
                </button>
                <button className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${lightMode ? "text-[#65676b] hover:bg-[#f2f3f5]" : "text-[#b0b3b8] hover:bg-[#3a3b3c]"}`}>
                  <Share className="h-5 w-5" />
                  <span className="text-[15px] font-semibold">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
