import { useState, useEffect } from "react";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ScheduleEvent } from "@/components/wedding/EventSchedule";

const iconOptions = [
  { value: "Sparkles", label: "✨ Sparkles" },
  { value: "Heart", label: "❤️ Heart" },
  { value: "Sun", label: "☀️ Sun" },
  { value: "UtensilsCrossed", label: "🍽️ Dinner" },
  { value: "Clock", label: "🕐 Clock" },
];

const Admin = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<ScheduleEvent, "id">>({
    icon: "Heart",
    title: "",
    time: "",
    description: "",
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
    if (!newEvent.title || !newEvent.time) {
      toast.error("Please fill in title and time");
      return;
    }

    const event: ScheduleEvent = {
      ...newEvent,
      id: Date.now().toString(),
    };

    const updatedEvents = [...events, event];
    saveEvents(updatedEvents);
    setNewEvent({ icon: "Heart", title: "", time: "", description: "" });
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
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={newEvent.icon}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, icon: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  placeholder="Brief description"
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
                        value={event.time}
                        onChange={(e) =>
                          updateEvent(event.id, "time", e.target.value)
                        }
                        placeholder="Time"
                      />
                      <Select
                        value={event.icon}
                        onValueChange={(value) =>
                          updateEvent(event.id, "icon", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={event.description}
                        onChange={(e) =>
                          updateEvent(event.id, "description", e.target.value)
                        }
                        placeholder="Description"
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
