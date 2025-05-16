"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { z } from "zod";
import { schema } from "./users-table";
import { Textarea } from "@/components/ui/textarea";

export default function UserDetail({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile();
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                defaultValue={item.name ?? ""}
                disabled
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Email</Label>
              <Input
                type="text"
                id="name"
                defaultValue={item.email ?? ""}
                disabled
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Sessions</Label>
              {item.sessions.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto border rounded-md p-3 bg-muted">
                  {item.sessions.map((session) => (
                    <div
                      key={session.id}
                      className="border-b pb-2 mb-2 last:border-b-0 last:mb-0"
                    >
                      <p>
                        <strong>IP Address:</strong>{" "}
                        {session.ipAddress || "Unknown"}
                      </p>
                      <p>
                        <strong>User Agent:</strong>{" "}
                        {session.userAgent || "Unknown"}
                      </p>
                      <p>
                        <strong>Expires At:</strong>{" "}
                        {new Date(session.expiresAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(session.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  No sessions found.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="createdAt">Created At</Label>
              <Input
                type="text"
                id="createdAt"
                defaultValue={item.createdAt.toDateString()}
                disabled
              />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button variant={"destructive"}>Revoke Session</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
