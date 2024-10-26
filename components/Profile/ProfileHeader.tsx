import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ProfileUser
{
    name: string;
    email: string;
    avatarUrl?: string;
    initials: string;
    kycStatus: string;
    // kycStatus: 'verified' | 'pending';
    joinDate: string;
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    address: string;
}

interface ProfileHeaderProps
{
    user: ProfileUser;
    onEdit: (field: 'avatar') => void;
}

const ProfileHeader = ({ user, onEdit }: ProfileHeaderProps) =>
{
    return (
        <div className="relative mb-6">
            <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
            <div className="absolute -bottom-16 left-6 flex items-end space-x-4">
                <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-white">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full"
                        onClick={() => onEdit('avatar')}
                    >
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center mt-2 space-x-2">
                        <Badge variant={user.kycStatus === 'verified' ? 'default' : 'destructive'}>
                            {user.kycStatus === 'verified' ? 'Verified' : 'Verification Pending'}
                        </Badge>
                        <Badge variant="outline">Member since {user.joinDate}</Badge>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;