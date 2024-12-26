import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  MessageSquare,
  Ban,
  Clock,
  DollarSign,
  Bell,
  History
} from 'lucide-react';
import type { InteractionDetailsResponse } from '../../types';

interface Props {
  details: InteractionDetailsResponse;
}

export function InteractionSidebar({ details }: Props) {
  const isUpcoming = details.interaction_status === 'upcoming';
  const isEscalated = details.interaction_status === 'escalated';
  const isShortDuration =
    details.actual_duration && details.actual_duration < details.duration * 0.8;

  return (
    <div className="w-80 space-y-6 border-l bg-muted/10 p-6">
      {/* Quick Actions */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Quick Actions</h3>
        <div className="space-y-2">
          {isUpcoming && (
            <Button variant="destructive" className="w-full" size="sm">
              <Ban className="mr-2 h-4 w-4" />
              Cancel Interaction
            </Button>
          )}
          <Button variant="secondary" className="w-full" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Add Admin Note
          </Button>
          {isEscalated && (
            <Button variant="outline" className="w-full" size="sm">
              <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
              Review Escalation
            </Button>
          )}
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Status Alerts</h3>
        <div className="space-y-2">
          {isShortDuration && (
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>Duration shorter than expected</span>
                </div>
              </CardContent>
            </Card>
          )}
          {details.is_payment_pending && (
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center text-sm">
                  <DollarSign className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>Payment pending verification</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Events */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Recent Events</h3>
        <div className="space-y-2">
          <Card>
            <CardContent className="p-3">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <History className="mr-2 h-4 w-4" />
                  <span>Status changed to {details.interaction_status}</span>
                </div>
                {details.fello_last_activity && (
                  <div className="flex items-center text-sm">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>
                      Fello was last active{' '}
                      {new Date(
                        details.fello_last_activity
                      ).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Statistics</h3>
        <Card>
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scheduled Duration</span>
                <span>{details.duration} mins</span>
              </div>
              {details.actual_duration && (
                <div className="flex justify-between text-sm">
                  <span>Actual Duration</span>
                  <span>{details.actual_duration} mins</span>
                </div>
              )}
              {details.fello_rated_interaction && (
                <div className="flex justify-between text-sm">
                  <span>Fello Rating</span>
                  <span>{details.fello_rated_interaction.toFixed(1)}/5</span>
                </div>
              )}
              {details.participant_rated_interaction && (
                <div className="flex justify-between text-sm">
                  <span>Participant Rating</span>
                  <span>
                    {details.participant_rated_interaction.toFixed(1)}/5
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
