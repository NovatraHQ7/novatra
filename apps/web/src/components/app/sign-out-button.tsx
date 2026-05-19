"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/lib/auth";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export function SignOutButton() {
  const router = useRouter();
  const signOut = useSignOut();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Sign out
      </Button>

      <Modal
        open={open}
        onClose={() => (signOut.isPending ? null : setOpen(false))}
        title="Sign out?"
        description="You’ll need to sign in again to access your dashboard."
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={signOut.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            loading={signOut.isPending}
            loadingText="Signing out…"
            onClick={async () => {
              try {
                await signOut.mutateAsync();
              } finally {
                setOpen(false);
                router.push("/auth/sign-in");
                router.refresh();
              }
            }}
          >
            Sign out
          </Button>
        </div>
      </Modal>
    </>
  );
}
