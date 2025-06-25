
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Plus,
  ExternalLink,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

const calendarEvents = [
  {
    id: 1,
    title: "Team Meeting",
    time: "09:00 AM",
    duration: "1 hour",
    type: "meeting",
    synced: true,
  },
  {
    id: 2,
    title: "Project Review",
    time: "02:00 PM",
    duration: "2 hours",
    type: "work",
    synced: true,
  },
  {
    id: 3,
    title: "Gym Session",
    time: "06:00 PM",
    duration: "1 hour",
    type: "personal",
    synced: false,
  },
];

const suggestedTasks = [
  {
    id: 1,
    title: "Prepare meeting agenda",
    suggestedTime: "08:30 AM",
    relatedEvent: "Team Meeting",
    priority: "high",
  },
  {
    id: 2,
    title: "Review project documents",
    suggestedTime: "01:00 PM",
    relatedEvent: "Project Review",
    priority: "medium",
  },
];

const connectedCalendars = [
  { name: "Google Calendar", connected: true, color: "bg-blue-500" },
  { name: "Outlook", connected: false, color: "bg-orange-500" },
  { name: "Apple Calendar", connected: false, color: "bg-gray-500" },
];

export const CalendarTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calendar Integration</h1>
          <p className="text-gray-600">Sync your calendars and let AI organize your day</p>
        </div>
        <Button className="quest-gradient text-white rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Today's Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {calendarEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl hover:shadow-md transition-all">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'meeting' ? 'bg-blue-500' :
                      event.type === 'work' ? 'bg-purple-500' :
                      'bg-green-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.time}
                      </div>
                      <div className="text-xs text-gray-500">{event.duration}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {event.synced && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Synced
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="quest-card border-0 border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span>AI Task Suggestions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Based on your calendar, here are some tasks you might want to add:
              </p>
              
              {suggestedTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">Suggested: {task.suggestedTime}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          task.priority === 'high' ? 'border-red-200 text-red-700' : 'border-yellow-200 text-yellow-700'
                        }`}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">Related to: {task.relatedEvent}</p>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-lg">
                    Add Task
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calendar View Placeholder */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle>Weekly View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center">
                <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-700 mb-2">Interactive Calendar</h3>
                <p className="text-sm text-gray-500 mb-4">
                  A full calendar view will be implemented here with task integration
                </p>
                <Button variant="outline" className="rounded-xl">
                  Switch to Month View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Calendar Settings</h2>
          
          {/* Connected Calendars */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="text-base">Connected Calendars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {connectedCalendars.map((calendar) => (
                <div key={calendar.name} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${calendar.color}`} />
                    <span className="text-sm font-medium">{calendar.name}</span>
                  </div>
                  {calendar.connected ? (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Connected
                    </Badge>
                  ) : (
                    <Button size="sm" variant="outline" className="text-xs rounded-lg">
                      Connect
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sync Options */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="text-base">Sync Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Auto-create tasks from events</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Send task reminders</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span>Block focus time</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="quest-card border-0">
            <CardHeader>
              <CardTitle className="text-base">Today's Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">5</div>
                  <div className="text-xs text-gray-600">Events</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">3</div>
                  <div className="text-xs text-gray-600">Free Hours</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
