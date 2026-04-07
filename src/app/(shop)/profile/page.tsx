"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import {
  usersApi,
  type User as ApiUser,
  type UserPutInput,
} from "@/apis/usersApi"
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

type EditableFieldKey =
  | "firstName"
  | "lastName"
  | "username"
  | "email"
  | "phone"
  | "gender"
  | "birthDate"
  | "password"
  | "image"
  | "address"
  | "city"
  | "state"
  | "postalCode"
  | "country"

type ProfileForm = Record<EditableFieldKey, string>

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

const buildProfileForm = (profileUser: ApiUser | null, currentUser: StoredUser | null): ProfileForm => ({
  firstName: profileUser?.firstName || currentUser?.firstName || "",
  lastName: profileUser?.lastName || currentUser?.lastName || "",
  username: profileUser?.username || currentUser?.username || "",
  email: profileUser?.email || currentUser?.email || "",
  phone: profileUser?.phone || "",
  gender: profileUser?.gender || "",
  birthDate: profileUser?.birthDate || "",
  password: profileUser?.password || "",
  image: profileUser?.image || currentUser?.image || "",
  address: profileUser?.address?.address || "",
  city: profileUser?.address?.city || "",
  state: profileUser?.address?.state || "",
  postalCode: profileUser?.address?.postalCode || "",
  country: profileUser?.address?.country || "",
})

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null)
  const [profileUser, setProfileUser] = useState<ApiUser | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSavingPut, setIsSavingPut] = useState(false)
  const [formValues, setFormValues] = useState<ProfileForm>(() => buildProfileForm(null, null))

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

  useEffect(() => {
    if (isEditing) {
      return
    }

    setFormValues(buildProfileForm(profileUser, currentUser))
  }, [profileUser, currentUser, isEditing])

  const isLoggedIn = Boolean(currentUser)

  const displayName = useMemo(() => {
    const nameParts = [formValues.firstName, formValues.lastName].filter(Boolean)
    if (nameParts.length) {
      return nameParts.join(" ")
    }

    return formValues.username || currentUser?.username || "Tài khoản"
  }, [currentUser?.username, formValues.firstName, formValues.lastName, formValues.username])

  const displayInitial = useMemo(() => {
    return (
      formValues.lastName.charAt(0) ||
      formValues.firstName.charAt(0) ||
      formValues.username.charAt(0) ||
      currentUser?.username?.charAt(0) ||
      "U"
    ).toUpperCase()
  }, [currentUser?.username, formValues.firstName, formValues.lastName, formValues.username])

  const setField = (field: EditableFieldKey, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleStartEdit = () => {
    setFormValues(buildProfileForm(profileUser, currentUser))
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setFormValues(buildProfileForm(profileUser, currentUser))
    setIsEditing(false)
  }

  const mergeProfile = (updated: ApiUser) => {
    setProfileUser((prev) => {
      if (!prev) {
        return updated
      }

      return {
        ...prev,
        ...updated,
        address: {
          ...prev.address,
          ...updated.address,
        },
      }
    })
  }

  const handleSavePut = async () => {
    if (!currentUser?.id || !profileUser) {
      toast.error("Không tìm thấy thông tin người dùng để cập nhật")
      return
    }

    const payload: UserPutInput = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      username: formValues.username,
      password: formValues.password,
      birthDate: formValues.birthDate,
      gender: formValues.gender,
      image: formValues.image,
      address: {
        address: formValues.address,
        city: formValues.city,
        state: formValues.state,
        postalCode: formValues.postalCode,
        country: formValues.country,
      },
      role: profileUser.role || currentUser.role || "user",
    }

    try {
      setIsSavingPut(true)
      const updated = await usersApi.updateUser(currentUser.id, payload)
      mergeProfile(updated)
      setIsEditing(false)
      toast.success("Đã sửa thành công!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cập nhật PUT thất bại")
    } finally {
      setIsSavingPut(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    window.dispatchEvent(new Event("auth-changed"))
    setCurrentUser(null)
    setProfileUser(null)
    setProfileError(null)
    setIsEditing(false)
  }

  const renderEditableField = (
    field: EditableFieldKey,
    label: string,
    options?: { type?: string }
  ) => (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input
        type={options?.type}
        value={formValues[field]}
        onChange={(event) => setField(field, event.target.value)}
        readOnly={!isEditing || field === "username"}
        disabled={!isEditing || field === "username"}
        placeholder="Chưa có"
      />
    </div>
  )

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
                <AvatarImage src={formValues.image || currentUser?.image} alt={displayName} />
                <AvatarFallback>{displayInitial}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <CardTitle className="truncate">{displayName}</CardTitle>
                <CardDescription className="truncate">
                  {formValues.email || currentUser?.email || "Chưa cập nhật email"}
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
            {renderEditableField("lastName", "Họ")}
            {renderEditableField("firstName", "Tên")}
            {renderEditableField("username", "Tên đăng nhập")}
            {renderEditableField("email", "Email")}
            {renderEditableField("phone", "Số điện thoại")}
            {renderEditableField("gender", "Giới tính")}
            {renderEditableField("birthDate", "Ngày sinh")}
            {renderEditableField("password", "Mật khẩu", { type: "password" })}
            {renderEditableField("image", "Ảnh đại diện (URL)")}
            {renderEditableField("address", "Địa chỉ")}
            {renderEditableField("city", "Thành phố")}
            {renderEditableField("state", "Tỉnh/Bang")}
            {renderEditableField("postalCode", "Mã bưu chính")}
            {renderEditableField("country", "Quốc gia")}
          </CardContent>

          <CardFooter className="justify-end gap-2 border-t">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isSavingPut}
                >
                  Hủy
                </Button>
                <Button
                  onClick={() => void handleSavePut()}
                  className="min-w-28 rounded-full px-5 font-semibold shadow-sm"
                  disabled={isSavingPut}
                >
                  {isSavingPut ? "Đang sửa..." : "Lưu"}
                </Button>
              </>
            ) : (
              <Button variant="outline" className="rounded-full px-5" onClick={handleStartEdit}>
                Chỉnh sửa
              </Button>
            )}
            
          </CardFooter>
        </Card>
      )}
    </main>
  )
}
