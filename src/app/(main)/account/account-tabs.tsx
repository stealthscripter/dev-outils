"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AccountBookmark } from "./account-bookmark";
interface AccountTabsProps {
  userId: string;
}

export function AccountTabs({ userId }: AccountTabsProps) {
  return (
    <Tabs defaultValue="bookmarks" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-transparent">
        <TabsTrigger
          value="bookmarks"
          className={cn(
            "relative pb-2 text-sm font-medium transition-colors dark:border-none",
            "data-[state=active]:text-spans data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=active]:after:bg-spans"
          )}
        >
          Bookmark
        </TabsTrigger>
        <TabsTrigger
          value="folders"
          className={cn(
            "relative pb-2 text-sm font-medium transition-colors dark:border-none",
            "data-[state=active]:text-spans data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=active]:after:bg-spans"
          )}
        >
          Folders
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bookmarks">
        <AccountBookmark userId={userId} />
      </TabsContent>
      <TabsContent value="folders">
        <div className="mt-10 text-center font-quicksand">
          <h1 className="text-muted-foreground">
            A saved website feature will be introduced soon
          </h1>
        </div>
      </TabsContent>
    </Tabs>
  );
}
