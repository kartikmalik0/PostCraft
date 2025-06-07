"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Download, Image as ImageIcon, Heart, MessageCircle, Send, Bookmark, Sun, Moon, Palette, MoreHorizontal } from "lucide-react"
import { toPng } from 'html-to-image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function InstagramTemplate() {
  const [profile, setProfile] = useState({
    name: "Jane Smith",
    username: "janesmith",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: false,
    location: "New York, NY",
  })

  const [content, setContent] = useState(
    "Excited to share my latest project! 🚀 Working on something amazing that will change how we think about social media. Can't wait to show you all what we've been building! ✨\n\n#innovation #tech #startup #excited #newproject"
  )

  const [metrics, setMetrics] = useState({
    likes: "1,234",
    comments: "89",
    shares: "45",
  })

  const [timeAgo, setTimeAgo] = useState("2 HOURS AGO")
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
      backgroundColor: lightMode ? '#ffffff' : '#000000'
    })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'instagram-post.png'
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
                <Palette className="h-5 w-5 text-pink-500" />
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

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="flex">
                  <p className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                    @
                  </p>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="rounded-l-none h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="h-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="verified" className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input
                    id="verified"
                    type="checkbox"
                    checked={profile.verified}
                    onChange={(e) => setProfile({ ...profile, verified: e.target.checked })}
                    className="rounded text-primary"
                  />
                  Verified Account
                </Label>
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium">
                  Caption
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="resize-none"
                  placeholder="Write a caption..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeAgo" className="text-sm font-medium">
                  Posted Time
                </Label>
                <Input
                  id="timeAgo"
                  value={timeAgo}
                  onChange={(e) => setTimeAgo(e.target.value)}
                  className="h-10"
                />
              </div>
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
            className={`w-full rounded-xl shadow-xl overflow-hidden ${lightMode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            {/* Instagram Post Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={profile.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm">{profile.username}</p>
                    {profile.verified && (
                      <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {profile.location && (
                    <p className={`text-xs ${lightMode ? "text-gray-600" : "text-gray-400"}`}>{profile.location}</p>
                  )}
                </div>
              </div>
              <MoreHorizontal className={`h-5 w-5 ${lightMode ? "text-gray-600" : "text-gray-400"}`} />
            </div>

            {/* Post Content */}
            <div className="p-4">
              <div className="mb-3">
                <span className="font-semibold text-sm mr-2">{profile.username}</span>
                <span className="text-sm whitespace-pre-line">{content}</span>
              </div>
              <p className={`text-xs ${lightMode ? "text-gray-500" : "text-gray-400"} uppercase tracking-wide`}>
                {timeAgo}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <Heart className={`h-6 w-6 ${lightMode ? "text-gray-700" : "text-gray-300"}`} />
                  <MessageCircle className={`h-6 w-6 ${lightMode ? "text-gray-700" : "text-gray-300"}`} />
                  <Send className={`h-6 w-6 ${lightMode ? "text-gray-700" : "text-gray-300"}`} />
                </div>
                <Bookmark className={`h-6 w-6 ${lightMode ? "text-gray-700" : "text-gray-300"}`} />
              </div>
              
              <div className="text-sm font-semibold mb-1">
                {metrics.likes} likes
              </div>
              
              <div className={`text-sm ${lightMode ? "text-gray-500" : "text-gray-400"}`}>
                View all {metrics.comments} comments
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
