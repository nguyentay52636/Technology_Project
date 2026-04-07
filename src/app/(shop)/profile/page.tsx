"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { usersApi, type User as ApiUser } from "@/apis/usersApi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type StoredUser = {
  id?: number
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  image?: string
  role?: string
}

const getStoredUser = (): StoredUser | null => {
  if (typeof window === "undefined") {
    return null
  }

  const storedUser = localStorage.getItem("currentUser")
  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser) as StoredUser
  } catch {
    return null
  }
}

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null)
  const [profileUser, setProfileUser] = useState<ApiUser | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)

  useEffect(() => {
    const syncAuthUser = () => {
      setCurrentUser(getStoredUser())
    }

    syncAuthUser()
    window.addEventListener("storage", syncAuthUser)
    window.addEventListener("auth-changed", syncAuthUser)

    return () => {
      window.removeEventListener("storage", syncAuthUser)
      window.removeEventListener("auth-changed", syncAuthUser)
    }
  }, [])

  useEffect(() => {
    const loadProfile = async () => {
      setProfileError(null)
      setProfileUser(null)

      if (!currentUser?.id) {
        return
      }

      try {
        setIsLoadingProfile(true)
        const user = await usersApi.getUserById(currentUser.id)
        setProfileUser(user)
      } catch (error) {
        setProfileError(error instanceof Error ? error.message : "Không thể tải thông tin hồ sơ")
      } finally {
        setIsLoadingProfile(false)
      }
    }

    void loadProfile()
  }, [currentUser?.id])

  const isLoggedIn = Boolean(currentUser)

  const displayName = useMemo(() => {
    const nameParts = [profileUser?.firstName, profileUser?.lastName].filter(Boolean)
    if (nameParts.length) {
      return nameParts.join(" ")
    }

    return profileUser?.username || currentUser?.username || "Tài khoản"
  }, [currentUser?.username, profileUser?.firstName, profileUser?.lastName, profileUser?.username])

  const displayInitial = useMemo(() => {
    return (
      profileUser?.lastName?.charAt(0) ||
      profileUser?.firstName?.charAt(0) ||
      profileUser?.username?.charAt(0) ||
      currentUser?.username?.charAt(0) ||
      "U"
    ).toUpperCase()
  }, [currentUser?.username, profileUser?.firstName, profileUser?.lastName, profileUser?.username])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    window.dispatchEvent(new Event("auth-changed"))
    setCurrentUser(null)
    setProfileUser(null)
    setProfileError(null)
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hồ sơ cá nhân</h1>
          <p className="text-sm text-muted-foreground">Xem thông tin tài khoản hiện tại.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>

      {!isLoggedIn ? (
        <Card>
          <CardHeader>
            <CardTitle>Bạn chưa đăng nhập</CardTitle>
            <CardDescription>Hãy đăng nhập để xem thông tin cá nhân.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end gap-2 border-t">
            <Button asChild variant="outline">
              <Link href="/signup">Đăng ký</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage src={profileUser?.image || currentUser?.image} alt={displayName} />
                <AvatarFallback>{displayInitial}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <CardTitle className="truncate">{displayName}</CardTitle>
                <CardDescription className="truncate">
                  {profileUser?.email || currentUser?.email || "Chưa cập nhật email"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-5">
            {isLoadingProfile && (
              <p className="text-sm text-muted-foreground">Đang tải thông tin hồ sơ...</p>
            )}
            {profileError && (
              <p className="text-sm text-destructive">{profileError}</p>
            )}

            <div className="grid gap-2">
              <Label>ID</Label>
              <Input value={profileUser?.id?.toString() || currentUser?.id?.toString() || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Họ</Label>
              <Input value={profileUser?.lastName || currentUser?.lastName || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Tên</Label>
              <Input value={profileUser?.firstName || currentUser?.firstName || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Tên đăng nhập</Label>
              <Input value={profileUser?.username || currentUser?.username || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input value={profileUser?.email || currentUser?.email || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Số điện thoại</Label>
              <Input value={profileUser?.phone || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Giới tính</Label>
              <Input value={profileUser?.gender || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Ngày sinh</Label>
              <Input value={profileUser?.birthDate || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Mật khẩu</Label>
              <Input type="password" value={profileUser?.password || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Ảnh đại diện (URL)</Label>
              <Input value={profileUser?.image || currentUser?.image || ""} readOnly disabled placeholder="Chưa có" />
            </div>

            <div className="grid gap-2">
              <Label>Địa chỉ</Label>
              <Input value={profileUser?.address?.address || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Thành phố</Label>
              <Input value={profileUser?.address?.city || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Tỉnh/Bang</Label>
              <Input value={profileUser?.address?.state || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Mã bưu chính</Label>
              <Input value={profileUser?.address?.postalCode || ""} readOnly disabled placeholder="Chưa có" />
            </div>
            <div className="grid gap-2">
              <Label>Quốc gia</Label>
              <Input value={profileUser?.address?.country || ""} readOnly disabled placeholder="Chưa có" />
            </div>
          </CardContent>

          <CardFooter className="justify-end border-t">
            <Button variant="destructive" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </CardFooter>
        </Card>
      )}
    </main>
  )
}
