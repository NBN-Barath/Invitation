import { useState, useEffect } from "react";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ScheduleEvent } from "@/components/wedding/EventSchedule";

const Admin = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<ScheduleEvent, "id">>({
    title: "",
    date: "",
    day: "",
    time: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("weddingEvents");
    if (stored) {
      setEvents(JSON.parse(stored));
    }
    const enabled = localStorage.getItem("scheduleEnabled");
    setScheduleEnabled(enabled === "true");
  }, []);

  const toggleScheduleEnabled = (enabled: boolean) => {
    localStorage.setItem("scheduleEnabled", String(enabled));
    setScheduleEnabled(enabled);
    toast.success(enabled ? "Event schedule enabled" : "Event schedule disabled");
  };

  const saveEvents = (updatedEvents: ScheduleEvent[]) => {
    localStorage.setItem("weddingEvents", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.day || !newEvent.time) {
      toast.error("Please fill in all fields");
      return;
    }

    const event: ScheduleEvent = {
      ...newEvent,
      id: Date.now().toString(),
    };

    const updatedEvents = [...events, event];
    saveEvents(updatedEvents);
    setNewEvent({ title: "", date: "", day: "", time: "" });
    toast.success("Event added!");
  };

  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter((e) => e.id !== id);
    saveEvents(updatedEvents);
    toast.success("Event deleted");
  };

  const updateEvent = (id: string, field: keyof ScheduleEvent, value: string) => {
    const updatedEvents = events.map((e) =>
      e.id === id ? { ...e, [field]: value } : e
    );
    saveEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="font-serif text-3xl text-foreground">
            Event Schedule Admin
          </h1>
        </div>

        {/* Enable Schedule Toggle */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="schedule-toggle" className="text-base font-medium">
                  Enable Event Schedule
                </Label>
                <p className="text-sm text-muted-foreground">
                  When disabled, visitors will see "Coming Soon" message
                </p>
              </div>
              <Switch
                id="schedule-toggle"
                checked={scheduleEnabled}
                onCheckedChange={toggleScheduleEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Add New Event */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="e.g., Muhurtham"
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  placeholder="e.g., March 15, 2026"
                />
              </div>
              <div>
                <Label htmlFor="day">Day</Label>
                <Input
                  id="day"
                  value={newEvent.day}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, day: e.target.value })
                  }
                  placeholder="e.g., Sunday"
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                  placeholder="e.g., 10:00 AM – 11:30 AM"
                />
              </div>
            </div>
            <Button onClick={addEvent} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </CardContent>
        </Card>

        {/* Existing Events */}
        <Card>
          <CardHeader>
            <CardTitle>
              Current Events ({events.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No events added yet. Add your first event above.
              </p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        value={event.title}
                        onChange={(e) =>
                          updateEvent(event.id, "title", e.target.value)
                        }
                        placeholder="Title"
                      />
                      <Input
                        value={event.date}
                        onChange={(e) =>
                          updateEvent(event.id, "date", e.target.value)
                        }
                        placeholder="Date"
                      />
                      <Input
                        value={event.day}
                        onChange={(e) =>
                          updateEvent(event.id, "day", e.target.value)
                        }
                        placeholder="Day"
                      />
                      <Input
                        value={event.time}
                        onChange={(e) =>
                          updateEvent(event.id, "time", e.target.value)
                        }
                        placeholder="Time"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground mt-4 text-center">
          Changes are saved automatically to local storage.
        </p>
      </div>
    </div>
  );
};

export default Admin;
