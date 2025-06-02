"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Download, Image as ImageIcon, Heart, MessageCircle, Share, Bookmark, Sun, Moon, Palette, MoreHorizontal, Music, Play } from "lucide-react"
import { toPng } from 'html-to-image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TikTokTemplate() {
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    username: "sarahjohnson",
    avatar: "/placeholder.svg?height=60&width=60",
    verified: false,
    description: "Just vibing and creating content! ✨",
    sound: "Original sound - sarahjohnson",
    videoThumbnail: null as string | null,
  })

  const [metrics, setMetrics] = useState({
    likes: "12.3K",
    comments: "847",
    shares: "234",
    saves: "156",
  })

  const [lightMode, setLightMode] = useState(false) // TikTok is typically dark

  const postRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)

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

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile({
          ...profile,
          videoThumbnail: e.target?.result as string,
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
        link.download = 'tiktok-post.png'
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
                <Palette className="h-5 w-5 text-red-500" />
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
                  Display Name
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
                <Label htmlFor="description" className="text-sm font-medium">
                  Video Description
                </Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  rows={3}
                  className="resize-none"
                  placeholder="Describe your video..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sound" className="text-sm font-medium">
                  Sound/Music
                </Label>
                <Input
                  id="sound"
                  value={profile.sound}
                  onChange={(e) => setProfile({ ...profile, sound: e.target.value })}
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

              <div className="space-y-2">
                <Label htmlFor="thumbnail" className="text-sm font-medium">
                  Video Thumbnail
                </Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => thumbnailInputRef.current?.click()} className="flex-1">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {profile.videoThumbnail ? "Change" : "Upload"}
                  </Button>
                  {profile.videoThumbnail && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setProfile({ ...profile, videoThumbnail: null })}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  )}
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailChange}
                  />
                  <div className="h-10 w-6 rounded overflow-hidden border-2 border-border bg-gray-100 dark:bg-gray-800">
                    {profile.videoThumbnail ? (
                      <img
                        src={profile.videoThumbnail}
                        alt="Thumbnail"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <ImageIcon className="h-3 w-3 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="saves" className="text-sm font-medium">
                  Saves
                </Label>
                <Input
                  id="saves"
                  value={metrics.saves}
                  onChange={(e) => setMetrics({ ...metrics, saves: e.target.value })}
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
        <div className="w-full max-w-sm">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
            <p className="text-sm text-muted-foreground">Your TikTok will look exactly like this</p>
          </div>

          <div
            ref={postRef}
            className={`w-full aspect-[9/16] rounded-2xl shadow-xl overflow-hidden relative ${lightMode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            {/* Video Background */}
            <div className={`absolute inset-0 ${lightMode ? "bg-gray-100" : "bg-gray-900"}`}>
              {profile.videoThumbnail ? (
                <img
                  src={profile.videoThumbnail}
                  alt="Video thumbnail"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Play className={`h-16 w-16 ${lightMode ? "text-gray-400" : "text-gray-600"}`} />
                </div>
              )}
            </div>

            {/* Play button overlay (always visible) */}
            {profile.videoThumbnail && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/30 rounded-full p-4">
                  <Play className="h-12 w-12 text-white fill-white" />
                </div>
              </div>
            )}

            {/* TikTok UI Overlay */}
            <div className="absolute inset-0 flex">
              {/* Left side - Video info */}
              <div className="flex-1 flex flex-col justify-end p-4">
                <div className="space-y-3">
                  {/* User info */}
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={profile.avatar || "/placeholder.svg"}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-white font-semibold text-sm">@{profile.username}</span>
                    {profile.verified && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  {/* Description */}
                  <div className="text-white text-sm leading-relaxed">
                    {profile.description}
                  </div>

                  {/* Sound */}
                  <div className="flex items-center gap-2 text-white text-xs">
                    <Music className="h-3 w-3" />
                    <span className="truncate">{profile.sound}</span>
                  </div>
                </div>
              </div>

              {/* Right side - Action buttons */}
              <div className="w-16 flex flex-col items-center justify-end pb-4 space-y-6">
                {/* Like */}
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-800/50 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{metrics.likes}</span>
                </div>

                {/* Comment */}
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-800/50 flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{metrics.comments}</span>
                </div>

                {/* Share */}
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-800/50 flex items-center justify-center">
                    <Share className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{metrics.shares}</span>
                </div>

                {/* Save */}
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-800/50 flex items-center justify-center">
                    <Bookmark className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xs mt-1">{metrics.saves}</span>
                </div>

                {/* Profile avatar (spinning) */}
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white animate-spin" style={{animationDuration: '3s'}}>
                  <img
                    src={profile.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
