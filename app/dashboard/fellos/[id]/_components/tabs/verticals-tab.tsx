import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { GraduationCap, User } from 'lucide-react';

import type { AdminUserDetailsVerticalsResponse } from '../../types';

const VERTICAL_LABELS: Record<string, string> = {
  alcohol_use: 'Alcohol Use',
  drug_use: 'Drug Use',
  relationships: 'Relationships',
  parenting: 'Parenting'
};

interface VerticalsTabProps {
  verticals: AdminUserDetailsVerticalsResponse;
  fellowId: string;
}

export default function VerticalsTab({
  verticals,
  fellowId
}: VerticalsTabProps) {
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!verticals.verticals || verticals.verticals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verticals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No verticals available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              {verticals.profile_picture_url ? (
                <AvatarImage
                  src={verticals.profile_picture_url}
                  alt={verticals.full_name || 'Profile'}
                />
              ) : (
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {verticals.full_name || 'Unknown Name'}
              </CardTitle>
              <div className="mt-1 flex items-center space-x-2">
                {verticals.status && (
                  <Badge
                    variant={
                      verticals.status === 'active' ? 'default' : 'secondary'
                    }
                  >
                    {verticals.status}
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  ID: {verticals.profile_id}
                </span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="ml-auto">
            Last Login: {formatDate(verticals.last_login)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {verticals.verticals.map((vertical) => (
              <Accordion
                key={vertical}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={vertical} className="rounded-lg border">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">
                          {VERTICAL_LABELS[vertical] || vertical}
                        </span>
                        <p className="text-left text-sm text-muted-foreground">
                          {verticals.onboarding_answers?.filter(
                            ([verticalType]) => verticalType === vertical
                          ).length || 0}{' '}
                          answers
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="mt-2 space-y-4">
                      {verticals.onboarding_answers
                        ?.filter(([verticalType]) => verticalType === vertical)
                        ?.map(([, id, question, answerDetail]) => (
                          <div
                            key={id}
                            className="space-y-2 border-l-2 border-muted py-2 pl-4"
                          >
                            <h4 className="text-sm font-medium text-muted-foreground">
                              {question}
                            </h4>
                            <p className="text-sm">{answerDetail.answer}</p>
                          </div>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
