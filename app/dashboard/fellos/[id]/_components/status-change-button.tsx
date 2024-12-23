// app/dashboard/fellos/[id]/_components/status-change-button.tsx
'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { changeStatus, updateStatusReason } from '../_actions';

interface StatusChangeButtonProps {
  currentStatus: string;
  fellowId: string | number;
}

const STATUS_OPTIONS = [
  'active',
  'inactive',
  'pending',
  'suspended',
  'blocked'
] as const;

export default function StatusChangeButton({
  currentStatus,
  fellowId
}: StatusChangeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async () => {
    if (selectedStatus === currentStatus) return;

    setIsLoading(true);
    try {
      await changeStatus(fellowId.toString(), selectedStatus);
      if (reason) {
        await updateStatusReason(fellowId.toString(), reason);
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Change Status
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Fellow Status</DialogTitle>
            <DialogDescription>
              Update the fellow's status and provide a reason for the change.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">New Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Change</label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for this status change..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusChange}
              disabled={isLoading || selectedStatus === currentStatus}
            >
              {isLoading ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
