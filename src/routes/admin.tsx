import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { AvailabilityCalendar, formatReservationBlockLabel } from "@/components/availability-calendar";
import { ctaClass } from "@/components/cta-button";
import { cn } from "@/lib/utils";
import { RENTAL_DAYS } from "@/lib/rental-period";
import { findReservationBlockForDateKey, toDateKey, type ReservationBlock } from "@/lib/reservations";
import {
  addAdminReservation,
  fetchAdminDresses,
  fetchAdminReservations,
  removeAdminReservation,
  updateAdminDress,
  verifyAdminLogin,
  type AdminDress,
} from "@/lib/admin-fns";

const ADMIN_SESSION_KEY = "na-curva-admin-password";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }, { title: "Admin — Na Curva" }],
  }),
  component: AdminPage,
});

type AdminTab = "calendar" | "details";

function AdminPage() {
  const [adminPassword, setAdminPassword] = useState<string | null>(null);
  const [loginInput, setLoginInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [dresses, setDresses] = useState<AdminDress[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [tab, setTab] = useState<AdminTab>("calendar");
  const [reservations, setReservations] = useState<ReservationBlock[]>([]);
  const [blockDays, setBlockDays] = useState(RENTAL_DAYS);
  const [pendingStart, setPendingStart] = useState<Date | null>(null);
  const [highlightedBlockStart, setHighlightedBlockStart] = useState<string | null>(null);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [designer, setDesigner] = useState("");
  const [price, setPrice] = useState(0);
  const [retail, setRetail] = useState(0);
  const [available, setAvailable] = useState(true);
  const [ptName, setPtName] = useState("");
  const [ptDescription, setPtDescription] = useState("");
  const [ptDetails, setPtDetails] = useState("");
  const [enName, setEnName] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [enDetails, setEnDetails] = useState("");

  const selectedDress = useMemo(
    () => dresses.find((dress) => dress.slug === selectedSlug),
    [dresses, selectedSlug],
  );

  const loadDresses = useCallback(async (password: string) => {
    const data = await fetchAdminDresses({ data: { adminPassword: password } });
    setDresses(data);
    if (data.length > 0) {
      setSelectedSlug((current) => current || data[0].slug);
    }
  }, []);

  const loadReservations = useCallback(async (password: string, slug: string) => {
    if (!slug) return;
    const blocks = await fetchAdminReservations({
      data: { adminPassword: password, slug },
    });
    setReservations(blocks);
  }, []);

  const applyDressToForm = useCallback((dress: AdminDress) => {
    setDesigner(dress.designer);
    setPrice(dress.price);
    setRetail(dress.retail);
    setAvailable(dress.available);
    setPtName(dress.translations.pt.name);
    setPtDescription(dress.translations.pt.description);
    setPtDetails(dress.translations.pt.details.join("\n"));
    setEnName(dress.translations.en.name);
    setEnDescription(dress.translations.en.description);
    setEnDetails(dress.translations.en.details.join("\n"));
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!stored) return;
    setAdminPassword(stored);
    setIsLoading(true);
    loadDresses(stored)
      .catch((error) => setErrorMessage(error instanceof Error ? error.message : String(error)))
      .finally(() => setIsLoading(false));
  }, [loadDresses]);

  useEffect(() => {
    if (!adminPassword || !selectedSlug) return;
    setPendingStart(null);
    setHighlightedBlockStart(null);
    setCalendarError(null);
    loadReservations(adminPassword, selectedSlug).catch((error) =>
      setErrorMessage(error instanceof Error ? error.message : String(error)),
    );
  }, [adminPassword, selectedSlug, loadReservations]);

  useEffect(() => {
    if (selectedDress) applyDressToForm(selectedDress);
  }, [selectedDress, applyDressToForm]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      await verifyAdminLogin({ data: { adminPassword: loginInput } });
      sessionStorage.setItem(ADMIN_SESSION_KEY, loginInput);
      setAdminPassword(loginInput);
      await loadDresses(loginInput);
      setStatusMessage("Signed in.");
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Could not sign in.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminPassword(null);
    setDresses([]);
    setSelectedSlug("");
    setLoginInput("");
  };

  const handleAdminDayClick = (date: Date) => {
    const dateKey = toDateKey(date.getFullYear(), date.getMonth(), date.getDate());
    const existing = findReservationBlockForDateKey(dateKey, reservations);
    if (existing) {
      setHighlightedBlockStart(existing.startDate);
      setPendingStart(null);
      setCalendarError(null);
      return;
    }
    setHighlightedBlockStart(null);
    setPendingStart(date);
  };

  const handleConfirmBlock = async () => {
    if (!adminPassword || !selectedSlug || !pendingStart) return;
    const startDate = toDateKey(
      pendingStart.getFullYear(),
      pendingStart.getMonth(),
      pendingStart.getDate(),
    );
    const nextBlock = { startDate, days: blockDays };

    setIsSaving(true);
    setErrorMessage(null);
    setCalendarError(null);
    try {
      await addAdminReservation({
        data: { adminPassword, slug: selectedSlug, startDate, days: blockDays },
      });
      setPendingStart(null);
      setReservations((current) =>
        [...current, nextBlock].sort((a, b) => a.startDate.localeCompare(b.startDate)),
      );
      setStatusMessage(`Blocked ${formatReservationBlockLabel(nextBlock)}.`);
      await loadReservations(adminPassword, selectedSlug);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setCalendarError(message);
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdminUnreserve = async (startDateKey: string) => {
    if (!adminPassword || !selectedSlug) return;
    setIsSaving(true);
    setErrorMessage(null);
    try {
      await removeAdminReservation({
        data: { adminPassword, slug: selectedSlug, startDate: startDateKey },
      });
      await loadReservations(adminPassword, selectedSlug);
      if (highlightedBlockStart === startDateKey) {
        setHighlightedBlockStart(null);
      }
      setStatusMessage(`Removed reservation starting ${startDateKey}.`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDress = async (event: FormEvent) => {
    event.preventDefault();
    if (!adminPassword || !selectedSlug) return;
    setIsSaving(true);
    setErrorMessage(null);
    try {
      await updateAdminDress({
        data: {
          adminPassword,
          slug: selectedSlug,
          designer,
          price,
          retail,
          available,
          translations: {
            pt: {
              name: ptName,
              description: ptDescription,
              details: ptDetails.split("\n").map((line) => line.trim()).filter(Boolean),
            },
            en: {
              name: enName,
              description: enDescription,
              details: enDetails.split("\n").map((line) => line.trim()).filter(Boolean),
            },
          },
        },
      });
      await loadDresses(adminPassword);
      setStatusMessage("Dress saved.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsSaving(false);
    }
  };

  if (!adminPassword) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-6 border border-border bg-background p-8"
        >
          <div>
            <p className="eyebrow text-coral">Na Curva</p>
            <h1 className="mt-2 font-display text-3xl">Admin</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to manage dresses and reservations.
            </p>
          </div>
          <label className="block space-y-2">
            <span className="eyebrow">Password</span>
            <input
              type="password"
              value={loginInput}
              onChange={(event) => setLoginInput(event.target.value)}
              className="w-full border border-border bg-background px-3 py-2 text-sm"
              autoComplete="current-password"
              required
            />
          </label>
          {loginError && (
            <p className="text-sm text-coral" role="alert">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoggingIn}
            className={ctaClass({ variant: "coral", size: "full" })}
          >
            {isLoggingIn ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-5 py-4 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-coral">Na Curva Admin</p>
            <h1 className="font-display text-2xl">Manage catalog</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 md:px-10">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="space-y-8">
            <label className="block max-w-md space-y-2">
              <span className="eyebrow">Dress</span>
              <select
                value={selectedSlug}
                onChange={(event) => setSelectedSlug(event.target.value)}
                className="w-full border border-border bg-background px-3 py-2 text-sm"
              >
                {dresses.map((dress) => (
                  <option key={dress.slug} value={dress.slug}>
                    {dress.translations.pt.name} · {dress.designer}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex gap-2 border-b border-border">
              <button
                type="button"
                onClick={() => setTab("calendar")}
                className={`px-4 py-2 text-sm ${tab === "calendar" ? "border-b-2 border-coral font-medium" : "text-muted-foreground"}`}
              >
                Availability
              </button>
              <button
                type="button"
                onClick={() => setTab("details")}
                className={`px-4 py-2 text-sm ${tab === "details" ? "border-b-2 border-coral font-medium" : "text-muted-foreground"}`}
              >
                Dress details
              </button>
            </div>

            {statusMessage && (
              <p className="text-sm text-foreground" role="status">
                {statusMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-sm text-coral" role="alert">
                {errorMessage}
              </p>
            )}

            {tab === "calendar" ? (
              <section className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-start">
                <div className="space-y-5">
                  <div className="space-y-4">
                    <label className="block max-w-[10rem] space-y-2">
                      <span className="eyebrow">Rental length</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={60}
                          value={blockDays}
                          onChange={(event) => {
                            setBlockDays(Math.max(1, Math.min(60, Number(event.target.value) || 1)));
                            setPendingStart(null);
                          }}
                          className="w-full border border-border bg-background px-3 py-2 text-sm tabular-nums"
                        />
                        <span className="text-sm text-muted-foreground">days</span>
                      </div>
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Pick a start date on the calendar, then confirm. Standard rentals are 5 days —
                      increase for special requests.
                    </p>
                  </div>

                  <AvailabilityCalendar
                    reservations={reservations}
                    size="modal"
                    rentalStart={null}
                    onRentalStartChange={() => {}}
                    selectionError={calendarError}
                    onSelectionError={setCalendarError}
                    adminMode
                    adminBlockDays={blockDays}
                    adminPendingStart={pendingStart}
                    onAdminDayClick={handleAdminDayClick}
                    highlightedBlockStart={highlightedBlockStart}
                  />

                  {pendingStart && !calendarError && (
                    <div className="space-y-3 border border-border p-4">
                      <p className="text-sm font-medium">
                        Block{" "}
                        {formatReservationBlockLabel({
                          startDate: toDateKey(
                            pendingStart.getFullYear(),
                            pendingStart.getMonth(),
                            pendingStart.getDate(),
                          ),
                          days: blockDays,
                        })}
                        ?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={handleConfirmBlock}
                          disabled={isSaving}
                          className={ctaClass({ variant: "coral", size: "compact" })}
                        >
                          {isSaving ? "Saving…" : "Block dates"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPendingStart(null);
                            setCalendarError(null);
                          }}
                          disabled={isSaving}
                          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {calendarError && (
                    <p className="text-sm text-coral" role="alert">
                      {calendarError}
                    </p>
                  )}

                  {isSaving && (
                    <p className="text-sm text-muted-foreground">Updating calendar…</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="eyebrow">Blocked periods</h2>
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {reservations.length}
                    </span>
                  </div>

                  {reservations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No reservations yet.</p>
                  ) : (
                    <ul className="divide-y divide-border border border-border">
                      {reservations.map((block) => {
                        const isHighlighted = highlightedBlockStart === block.startDate;
                        return (
                          <li
                            key={block.startDate}
                            className={cn(
                              "flex items-center justify-between gap-4 px-4 py-3",
                              isHighlighted && "bg-coral/5",
                            )}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setHighlightedBlockStart(
                                  isHighlighted ? null : block.startDate,
                                )
                              }
                              className="min-w-0 text-left text-sm hover:text-foreground"
                            >
                              <span className="font-medium">
                                {formatReservationBlockLabel(block)}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAdminUnreserve(block.startDate)}
                              disabled={isSaving}
                              className="shrink-0 text-sm text-coral hover:underline disabled:opacity-50"
                            >
                              Remove
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <p className="text-sm text-muted-foreground">
                    Click a blocked period on the calendar or in this list to highlight it, then
                    use Remove.
                  </p>
                </div>
              </section>
            ) : (
              <form onSubmit={handleSaveDress} className="space-y-8">
                <section className="grid gap-4 sm:grid-cols-3">
                  <label className="block space-y-2 sm:col-span-3">
                    <span className="eyebrow">Designer</span>
                    <input
                      value={designer}
                      onChange={(event) => setDesigner(event.target.value)}
                      className="w-full border border-border bg-background px-3 py-2 text-sm"
                      required
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="eyebrow">Rental price (€)</span>
                    <input
                      type="number"
                      min={0}
                      value={price}
                      onChange={(event) => setPrice(Number(event.target.value))}
                      className="w-full border border-border bg-background px-3 py-2 text-sm"
                      required
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="eyebrow">Retail price (€)</span>
                    <input
                      type="number"
                      min={0}
                      value={retail}
                      onChange={(event) => setRetail(Number(event.target.value))}
                      className="w-full border border-border bg-background px-3 py-2 text-sm"
                      required
                    />
                  </label>
                  <label className="flex items-center gap-2 self-end pb-2 text-sm">
                    <input
                      type="checkbox"
                      checked={available}
                      onChange={(event) => setAvailable(event.target.checked)}
                    />
                    Available to rent
                  </label>
                </section>

                <section className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h2 className="eyebrow">Portuguese</h2>
                    <label className="block space-y-2">
                      <span className="text-sm">Title</span>
                      <input
                        value={ptName}
                        onChange={(event) => setPtName(event.target.value)}
                        className="w-full border border-border bg-background px-3 py-2 text-sm"
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm">Description</span>
                      <textarea
                        value={ptDescription}
                        onChange={(event) => setPtDescription(event.target.value)}
                        rows={4}
                        className="w-full border border-border bg-background px-3 py-2 text-sm"
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm">Details (one per line)</span>
                      <textarea
                        value={ptDetails}
                        onChange={(event) => setPtDetails(event.target.value)}
                        rows={5}
                        className="w-full border border-border bg-background px-3 py-2 text-sm"
                      />
                    </label>
                  </div>

                  <div className="space-y-4">
                    <h2 className="eyebrow">English</h2>
                    <label className="block space-y-2">
                      <span className="text-sm">Title</span>
                      <input
                        value={enName}
                        onChange={(event) => setEnName(event.target.value)}
                        className="w-full border border-border bg-background px-3 py-2 text-sm"
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm">Description</span>
                      <textarea
                        value={enDescription}
                        onChange={(event) => setEnDescription(event.target.value)}
                        rows={4}
                        className="w-full border border-border bg-background px-3 py-2 text-sm"
                        required
                      />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm">Details (one per line)</span>
                      <textarea
                        value={enDetails}
                        onChange={(event) => setEnDetails(event.target.value)}
                        rows={5}
                        className="w-full border border-border bg-background px-3 py-2 text-sm"
                      />
                    </label>
                  </div>
                </section>

                <button
                  type="submit"
                  disabled={isSaving}
                  className={ctaClass({ variant: "coral", size: "compact" })}
                >
                  {isSaving ? "Saving…" : "Save dress"}
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
