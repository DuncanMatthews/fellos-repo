'use client';

import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Star,
  Calendar,
  Clock,
  Activity,
  CreditCard,
  Globe,
  Languages,
  BadgeCheck,
  AlertCircle
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FelloGeneralResponse } from '../../types';

interface InfoItemProps {
  label: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  tooltip?: string;
}

function InfoItem({ label, value, icon, tooltip }: InfoItemProps) {
  const content = (
    <div className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="flex-1 space-y-1">
        <div className="text-sm font-medium leading-none text-muted-foreground">
          {label}
        </div>
        <div className="text-sm text-foreground">{value}</div>
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>
          <span>{tooltip}</span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

function formatDate(date: string | null): string {
  if (!date) return 'Never';

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(date));
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { color: string; icon: React.ReactNode }> = {
    active: {
      color: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
      icon: <BadgeCheck className="h-3 w-3" />
    },
    pending: {
      color: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
      icon: <Clock className="h-3 w-3" />
    },
    suspended: {
      color: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
      icon: <AlertCircle className="h-3 w-3" />
    }
  };

  const variant = variants[status.toLowerCase()] || variants.pending;

  return (
    <Badge
      variant="outline"
      className={`${variant.color} inline-flex items-center gap-1 font-medium`}
    >
      {variant.icon}
      <span>{status.replace(/_/g, ' ')}</span>
    </Badge>
  );
}

interface GeneralInfoTabProps {
  data: FelloGeneralResponse;
}

export default function GeneralInfoTab({ data }: GeneralInfoTabProps) {
  console.log('crucial', data);
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const hasModifiedInfo = data.is_critical_information_modified;

  return (
    <div className="grid gap-6 p-6">
      {hasModifiedInfo && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Critical information has been modified. Please review the changes.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <InfoItem
                label="Full Name"
                value={data.full_name}
                icon={<User className="h-4 w-4" />}
              />
              <InfoItem
                label="Gender"
                value={data.gender}
                icon={<User className="h-4 w-4" />}
              />
              <InfoItem
                label="Languages"
                value={
                  data.languages ? (
                    <div className="flex flex-wrap gap-1">
                      {data.languages.map((lang, index) => (
                        <Badge
                          key={`lang-${lang}-${index}`}
                          variant="secondary"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  ) : null
                }
                icon={<Languages className="h-4 w-4" />}
              />
              <InfoItem
                label="Email"
                value={
                  <a
                    href={`mailto:${data.email}`}
                    className="text-primary hover:underline"
                  >
                    {data.email}
                  </a>
                }
                icon={<Mail className="h-4 w-4" />}
              />
              <InfoItem
                label="Phone"
                value={
                  <a
                    href={`tel:${data.phone_number}`}
                    className="text-primary hover:underline"
                  >
                    {data.phone_number}
                  </a>
                }
                icon={<Phone className="h-4 w-4" />}
              />
              <InfoItem
                label="Address"
                value={data.address}
                icon={<MapPin className="h-4 w-4" />}
              />
              {data.partner_organization_code && (
                <InfoItem
                  label="Partner Organization"
                  value={data.partner_organization_code}
                  icon={<Building className="h-4 w-4" />}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <InfoItem
                label="Status"
                value={<StatusBadge status={data.status} />}
                icon={<Activity className="h-4 w-4" />}
                tooltip={
                  data.status_reason
                    ? `${data.status_reason.reason} - ${data.status_reason.submitting_user_name}`
                    : undefined
                }
              />
              <InfoItem
                label="Rating"
                value={
                  <div className="flex items-center gap-1">
                    <span>{data.rating}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                }
                icon={<Star className="h-4 w-4" />}
              />
              <InfoItem
                label="Application Date"
                value={formatDate(data.application_date)}
                icon={<Calendar className="h-4 w-4" />}
              />
              <InfoItem
                label="Last Login"
                value={formatDate(data.last_login)}
                icon={<Clock className="h-4 w-4" />}
              />
              <InfoItem
                label="Last Activity"
                value={formatDate(data.last_activity_at)}
                icon={<Activity className="h-4 w-4" />}
              />
              <InfoItem
                label="Stripe Setup"
                value={
                  <Badge
                    variant={
                      data.is_stripe_onboarding_complete
                        ? 'default'
                        : 'destructive'
                    }
                  >
                    <span>
                      {data.is_stripe_onboarding_complete
                        ? 'Complete'
                        : 'Incomplete'}
                    </span>
                  </Badge>
                }
                icon={<CreditCard className="h-4 w-4" />}
              />
              {Array.isArray(data.social_media) &&
                data.social_media.length > 0 && (
                  <InfoItem
                    label="Social Media"
                    value={
                      <div className="flex flex-wrap gap-1">
                        {data.social_media.map((social, index) => (
                          <Badge
                            key={`social-${social}-${index}`}
                            variant="secondary"
                          >
                            {social}
                          </Badge>
                        ))}
                      </div>
                    }
                    icon={<Globe className="h-4 w-4" />}
                  />
                )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
