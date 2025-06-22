"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Users, Camera, Shield, BarChart3, Download, Upload, Eye, MessageSquare, Heart } from "lucide-react"

export default function AdminDashboard() {
  const [siteSettings, setSiteSettings] = useState({
    isPublic: true,
    allowComments: true,
    moderateComments: true,
    allowPhotoUploads: false,
    showVisitorCount: true,
  })

  const stats = {
    totalPhotos: 24,
    totalMemories: 18,
    totalVisitors: 342,
    candlesLit: 89,
    recentUploads: 3,
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-start justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-6xl my-8 bg-white">
        <CardHeader className="border-b border-stone-200">
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Family Admin Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="memories">Memories</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-stone-600">Total Photos</p>
                        <p className="text-2xl font-bold text-stone-800">{stats.totalPhotos}</p>
                      </div>
                      <Camera className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-stone-600">Memories Shared</p>
                        <p className="text-2xl font-bold text-stone-800">{stats.totalMemories}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-stone-600">Site Visitors</p>
                        <p className="text-2xl font-bold text-stone-800">{stats.totalVisitors}</p>
                      </div>
                      <Eye className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-stone-600">Candles Lit</p>
                        <p className="text-2xl font-bold text-stone-800">{stats.candlesLit}</p>
                      </div>
                      <Heart className="w-8 h-8 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-stone-100">
                      <div className="flex items-center space-x-3">
                        <Camera className="w-4 h-4 text-amber-600" />
                        <span className="text-sm">3 new photos uploaded</span>
                      </div>
                      <span className="text-xs text-stone-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-stone-100">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-4 h-4 text-amber-600" />
                        <span className="text-sm">New memory from Margaret</span>
                      </div>
                      <span className="text-xs text-stone-500">5 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-4 h-4 text-amber-600" />
                        <span className="text-sm">12 candles lit today</span>
                      </div>
                      <span className="text-xs text-stone-500">Today</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Photos
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export All Memories
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Family Access
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Photo Management</h3>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photos
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Camera className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="font-medium">Total Photos</p>
                    <p className="text-2xl font-bold text-stone-800">{stats.totalPhotos}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="font-medium">Private Photos</p>
                    <p className="text-2xl font-bold text-stone-800">6</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Eye className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="font-medium">Featured Photos</p>
                    <p className="text-2xl font-bold text-stone-800">4</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Photo Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { name: "Childhood", count: 5 },
                      { name: "Family", count: 8 },
                      { name: "Career", count: 6 },
                      { name: "Recent", count: 3 },
                      { name: "Special", count: 2 },
                    ].map((category) => (
                      <div key={category.name} className="text-center p-3 bg-stone-50 rounded-lg">
                        <p className="font-medium text-stone-800">{category.name}</p>
                        <Badge variant="secondary">{category.count} photos</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="public-access">Public Access</Label>
                      <p className="text-sm text-stone-600">Allow anyone to view the memorial site</p>
                    </div>
                    <Switch
                      id="public-access"
                      checked={siteSettings.isPublic}
                      onCheckedChange={(checked) => setSiteSettings((prev) => ({ ...prev, isPublic: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-comments">Allow Comments</Label>
                      <p className="text-sm text-stone-600">Let visitors leave memories and tributes</p>
                    </div>
                    <Switch
                      id="allow-comments"
                      checked={siteSettings.allowComments}
                      onCheckedChange={(checked) => setSiteSettings((prev) => ({ ...prev, allowComments: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="moderate-comments">Moderate Comments</Label>
                      <p className="text-sm text-stone-600">Review comments before they appear publicly</p>
                    </div>
                    <Switch
                      id="moderate-comments"
                      checked={siteSettings.moderateComments}
                      onCheckedChange={(checked) => setSiteSettings((prev) => ({ ...prev, moderateComments: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="visitor-uploads">Allow Visitor Photo Uploads</Label>
                      <p className="text-sm text-stone-600">Let visitors contribute photos to the memorial</p>
                    </div>
                    <Switch
                      id="visitor-uploads"
                      checked={siteSettings.allowPhotoUploads}
                      onCheckedChange={(checked) =>
                        setSiteSettings((prev) => ({ ...prev, allowPhotoUploads: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Family Access Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { name: "David Johnson", role: "Admin", email: "david@email.com" },
                      { name: "Michael Johnson", role: "Editor", email: "michael@email.com" },
                      { name: "Jennifer Smith", role: "Editor", email: "jennifer@email.com" },
                      { name: "Thomas Johnson", role: "Viewer", email: "thomas@email.com" },
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                        <div>
                          <p className="font-medium text-stone-800">{member.name}</p>
                          <p className="text-sm text-stone-600">{member.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={member.role === "Admin" ? "default" : "secondary"}>{member.role}</Badge>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Invite Family Member
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Site Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="site-title">Memorial Title</Label>
                      <Input id="site-title" defaultValue="Sarah Elizabeth Johnson" />
                    </div>
                    <div>
                      <Label htmlFor="site-subtitle">Subtitle</Label>
                      <Input id="site-subtitle" defaultValue="A life beautifully lived" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="memorial-theme">Theme</Label>
                    <Select defaultValue="elegant">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elegant">Elegant (Current)</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="garden">Garden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-visitor-count">Show Visitor Count</Label>
                      <p className="text-sm text-stone-600">Display how many people have visited</p>
                    </div>
                    <Switch
                      id="show-visitor-count"
                      checked={siteSettings.showVisitorCount}
                      onCheckedChange={(checked) => setSiteSettings((prev) => ({ ...prev, showVisitorCount: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-amber-600 hover:bg-amber-700">Save Changes</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
