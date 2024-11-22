"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      date: new Date(),
      title: "Business Meeting",
      outfit: "Office Ready",
      notes: "Important client meeting",
    },
    {
      id: 2,
      date: new Date(Date.now() + 86400000),
      title: "Dinner Party",
      outfit: "Night Out",
      notes: "Casual elegant attire",
    },
  ]);

  const addEvent = (newEvent) => {
    setEvents([...events, { id: events.length + 1, ...newEvent }]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Outfit Calendar
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Plan your outfits for upcoming events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>Manage your events and outfits</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                  <div className="space-y-4">
                    {events
                      .filter((event) => event.date >= new Date())
                      .map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          onUpdate={updateEvent}
                          onDelete={deleteEvent}
                        />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="past">
                  <div className="space-y-4">
                    {events
                      .filter((event) => event.date < new Date())
                      .map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          onUpdate={updateEvent}
                          onDelete={deleteEvent}
                        />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <AddEventDialog onAddEvent={addEvent} />
            </CardFooter>
          </Card>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Outfit Suggestions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <OutfitSuggestionCard
              title="Business Casual"
              items={[
                "Navy Blazer",
                "White Shirt",
                "Khaki Chinos",
                "Brown Loafers",
              ]}
            />
            <OutfitSuggestionCard
              title="Date Night"
              items={[
                "Black Dress",
                "Statement Earrings",
                "Strappy Heels",
                "Clutch Purse",
              ]}
            />
            <OutfitSuggestionCard
              title="Weekend Brunch"
              items={[
                "Floral Sundress",
                "Denim Jacket",
                "Sandals",
                "Sunglasses",
              ]}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function EventCard({ event, onUpdate, onDelete }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.date.toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Outfit:</strong> {event.outfit}
        </p>
        <p>
          <strong>Notes:</strong> {event.notes}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <UpdateEventDialog event={event} onUpdate={onUpdate} />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(event.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

function AddEventDialog({ onAddEvent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: new Date(),
    title: "",
    outfit: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent(newEvent);
    setIsOpen(false);
    setNewEvent({ date: new Date(), title: "", outfit: "", notes: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Plan your outfit for an upcoming event.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date.toISOString().split("T")[0]}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: new Date(e.target.value) })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={newEvent.notes}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, notes: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function UpdateEventDialog({ event, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState(event);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedEvent);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Event</DialogTitle>
            <DialogDescription>
              Modify your event details and outfit.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={updatedEvent.title}
                onChange={(e) =>
                  setUpdatedEvent({ ...updatedEvent, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={updatedEvent.date.toISOString().split("T")[0]}
                onChange={(e) =>
                  setUpdatedEvent({
                    ...updatedEvent,
                    date: new Date(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="outfit" className="text-right">
                Outfit
              </Label>
              <Input
                id="outfit"
                value={updatedEvent.outfit}
                onChange={(e) =>
                  setUpdatedEvent({ ...updatedEvent, outfit: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={updatedEvent.notes}
                onChange={(e) =>
                  setUpdatedEvent({ ...updatedEvent, notes: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function OutfitSuggestionCard({ title, items }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Add to Calendar</Button>
      </CardFooter>
    </Card>
  );
}
