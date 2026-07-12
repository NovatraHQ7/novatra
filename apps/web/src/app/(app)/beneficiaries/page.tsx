"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icons";
import { beneficiaries as seeded, type Beneficiary } from "@/lib/mock";
import { ConfirmModal } from "@/components/ui/confirm-modal";

export default function BeneficiariesPage() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Beneficiary[]>(seeded);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [pendingRemove, setPendingRemove] = useState<Beneficiary | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (b) =>
        b.fullName.toLowerCase().includes(q) ||
        b.bankName.toLowerCase().includes(q) ||
        b.accountNumberMasked.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <ConfirmModal
        open={removeOpen}
        onClose={() => {
          setRemoveOpen(false);
          setPendingRemove(null);
        }}
        title="Remove beneficiary?"
        description={
          pendingRemove
            ? `${pendingRemove.fullName} • ${pendingRemove.bankName} ${pendingRemove.accountNumberMasked}`
            : "This action can’t be undone in this demo."
        }
        confirmText="Remove"
        confirmVariant="danger"
        onConfirm={() => {
          if (pendingRemove) {
            setItems((prev) => prev.filter((x) => x.id !== pendingRemove.id));
          }
          setRemoveOpen(false);
          setPendingRemove(null);
        }}
      />

      <PageHeader
        title="Beneficiaries"
        subtitle="Recipients you can send money to (demo data + local add)."
        right={
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            <Badge variant="muted">{items.length} saved</Badge>
            <Button
              type="button"
              variant="secondary"
              leftIcon={<Icon name="plus" />}
              className="w-full sm:w-auto"
              onClick={() => {
                const id = `b_${Math.random().toString(16).slice(2, 8)}`;
                setItems((prev) => [
                  {
                    id,
                    fullName: "New Beneficiary",
                    bankName: "Bank",
                    accountNumberMasked: "**** 0000",
                    country: "Nigeria",
                  },
                  ...prev,
                ]);
              }}
            >
              Quick add
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Saved recipients" subtitle="Search and manage recipients." />
          <div className="mt-5">
            <Input
              id="search"
              name="search"
              label="Search"
              placeholder="Search by name or bank…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rightSlot={<Icon name="search" className="h-4 w-4" />}
            />
          </div>

          <div className="mt-5 divide-y divide-line">
            {filtered.map((b) => (
              <div key={b.id} className="flex items-start justify-between gap-3 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{b.fullName}</p>
                  <p className="mt-1 text-sm text-muted">
                    {b.bankName} • {b.accountNumberMasked}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="muted">{b.country}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPendingRemove(b);
                      setRemoveOpen(true);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted">
                No beneficiaries found.
              </div>
            ) : null}
          </div>
        </Card>

        <Card>
          <CardHeader title="Add beneficiary" subtitle="UI-only for now." />
          <div className="mt-5 space-y-4">
            <InlineAddForm
              onAdd={(b) => setItems((prev) => [b, ...prev])}
            />
            <p className="text-xs leading-5 text-muted">
              Next iteration: validate bank details, support payout methods, and sync to API.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function InlineAddForm({ onAdd }: { onAdd: (b: Beneficiary) => void }) {
  const [fullName, setFullName] = useState("");
  const [bankName, setBankName] = useState("");
  const [acct, setAcct] = useState("");

  const canAdd = fullName.trim().length > 2 && bankName.trim().length > 1 && acct.trim().length >= 6;

  return (
    <div className="space-y-4">
      <Input
        id="bn"
        name="bn"
        label="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Adaeze Okafor"
      />
      <Input
        id="bank"
        name="bank"
        label="Bank"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
        placeholder="GTBank"
      />
      <Input
        id="acct"
        name="acct"
        label="Account number"
        value={acct}
        onChange={(e) => setAcct(e.target.value)}
        placeholder="0123456789"
        hint="Stored locally in this demo. We mask it after adding."
      />

      <Button
        type="button"
        className="w-full"
        disabled={!canAdd}
        onClick={() => {
          const masked = acct.trim().slice(-4).padStart(4, "0");
          onAdd({
            id: `b_${Math.random().toString(16).slice(2, 8)}`,
            fullName: fullName.trim(),
            bankName: bankName.trim(),
            accountNumberMasked: `**** ${masked}`,
            country: "Nigeria",
          });
          setFullName("");
          setBankName("");
          setAcct("");
        }}
        rightIcon={<Icon name="arrowRight" />}
      >
        Add beneficiary
      </Button>
    </div>
  );
}
