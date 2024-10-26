"use client"
import KYCVerification from "@/components/Profile/KYCVerification";
import NotificationSettings from "@/components/Profile/NotificationSettings";
import PersonalInformation from "@/components/Profile/PersonalInformation";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import SecuritySettings from "@/components/Profile/SecuritySettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle, Shield, User } from "lucide-react";
import { useState } from "react";

const ProfilePage = () =>
{
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarUrl: '/api/placeholder/100/100',
        initials: 'JD',
        kycStatus: 'pending',
        joinDate: 'Jan 2024',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1990-01-01',
        address: '123 Main St, New York, NY 10001'
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <ProfileHeader
                user={user}
                onEdit={(type) => console.log('Edit', type)}
            />

            <div className="mt-20">
                <Tabs defaultValue="personal" className="space-y-6">
                    <TabsList className="grid w-full sm:grid-cols-3 h-auto gap-2 md:grid-cols-4">
                        <TabsTrigger value="personal">
                            <User className="mr-2 h-4 w-4" />
                            Personal
                        </TabsTrigger>
                        <TabsTrigger value="security">
                            <Shield className="mr-2 h-4 w-4" />
                            Security
                        </TabsTrigger>
                        <TabsTrigger value="verification">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Verification
                        </TabsTrigger>
                        <TabsTrigger value="notifications">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-6">
                        <PersonalInformation
                            user={user}
                            onUpdate={(updatedData) => setUser({ ...user, ...updatedData })}
                        />
                    </TabsContent>

                    <TabsContent value="security">
                        <SecuritySettings />
                    </TabsContent>

                    <TabsContent value="verification">
                        <KYCVerification />
                    </TabsContent>

                    <TabsContent value="notifications">
                        <NotificationSettings />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ProfilePage;