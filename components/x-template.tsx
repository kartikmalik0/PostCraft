"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Download, Image as ImageIcon, Check, MessageSquare, Repeat, Heart, BarChart2, Sun, Moon, Palette, Repeat2, Bookmark, Share } from "lucide-react"
import { toPng } from 'html-to-image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function XTemplate() {
  const [profile, setProfile] = useState({
    name: "John Smith",
    username: "johnsmith",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
  })

  const [content, setContent] = useState(
    'I built a 1-doc system for Bolt/Lovable/Replit to one-shot applications.\n\nA hybrid of PRD + implementation plan to provide detailed context in just 1 document.\n\nI call it "Unified Project Documentation"\n\nSimple steps:\n1/ Open @CodeGuidedev\n2/ New Project "Write your app idea"\n3/ Select AI tools (Replit, Lovable, Bolt etc)\n4/ Copy unified project doc by clicking "copy prompt"\n5/ Paste the prompt in any selected tool\n6/ Start building your app',
  )

  const [metrics, setMetrics] = useState({
    replies: "8",
    likes: "65",
    reposts: "12",
    views: "1.2K",
  })

  const [lightMode, setLightMode] = useState(false)

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
        link.download = 'x-post.png'
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
                <Palette className="h-5 w-5" />
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
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="resize-none"
                placeholder="What's happening?"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="replies" className="text-sm font-medium">
                  Replies
                </Label>
                <Input
                  id="replies"
                  value={metrics.replies}
                  onChange={(e) => setMetrics({ ...metrics, replies: e.target.value })}
                  className="h-10"
                />
              </div>
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
                <Label htmlFor="reposts" className="text-sm font-medium">
                  Reposts
                </Label>
                <Input
                  id="reposts"
                  value={metrics.reposts}
                  onChange={(e) => setMetrics({ ...metrics, reposts: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="views" className="text-sm font-medium">
                  Views
                </Label>
                <Input
                  id="views"
                  value={metrics.views}
                  onChange={(e) => setMetrics({ ...metrics, views: e.target.value })}
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

<div ref={postRef}>

</div>
          <div
            className={`w-full rounded-xl shadow-xl overflow-hidden ${lightMode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={profile.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="font-bold text-base">{profile.name}</p>
                    {profile.verified && (
                      <p className="ml-2 inline-flex items-center justify-center text-white rounded-full h-5 w-5">
                        <svg
                          viewBox="0 0 22 22"
                          aria-label="Verified account"
                          role="img"
                          className={`w-[29px] h-[29px] fill-current ${lightMode ? "text-blue-500" : "text-blue-400"}`}
                          data-testid="icon-verified"
                        >
                          <g>
                            <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                          </g>
                        </svg>
                      </p>
                    )}
                  </div>
                  <p className={`text-sm ${lightMode ? "text-gray-600" : "text-gray-400"}`}>@{profile.username}</p>
                </div>
                <div className={`${lightMode ? "text-gray-600" : "text-gray-400"} flex gap-2 items-center`}>
                  <div>
                    <svg
                      viewBox="0 0 33 32"
                      aria-hidden="true"
                      className={`w-[20px] h-[20px] ${lightMode ? "fill-gray-600" : "fill-gray-400"}`}
                    >
                      <g>
                        <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466" />
                      </g>
                    </svg>
                  </div>
                  <p className="text-[10px]">•••</p>
                </div>
              </div>

              <div className="mb-2 whitespace-pre-line text-[15px] leading-relaxed">{content}</div>

              <div className={`${lightMode ? "text-gray-600" : "text-gray-400"} text-sm`}>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1 rounded-full p-2 cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <p>{metrics.replies}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full p-2 cursor-pointer">
                    <Repeat2 className="h-4 w-4" />
                    <p>{metrics.reposts}</p>
                  </div>
                  <div className="flex gap-1 items-center rounded-full p-2 cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <p>{metrics.likes}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full p-2 cursor-pointer">
                    <BarChart2 className="h-4 w-4" />
                    <p>{metrics.views}</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-full p-2 cursor-pointer">
                    <Bookmark className="h-4 w-4" />
                    <Share className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}