import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteContactSubmission,
  deleteMediaFile,
  fetchContactSubmissions,
  listMediaFiles,
  uploadPortfolioFile,
} from '@/services/portfolio'
import { MEDIA_BUCKET, publicMediaUrl } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AdminSubmissionsPage() {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['contact-submissions'],
    queryFn: fetchContactSubmissions,
  })

  if (query.isPending) return <p className="text-sm text-muted-foreground">Loading submissions…</p>
  if (query.isError) return <p className="text-sm text-destructive">Unable to load submissions.</p>

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Contact submissions</h1>
      {query.data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <ul className="space-y-3">
          {query.data.map((item) => (
            <li key={item.id} className="rounded-xl border border-border p-4">
              <p className="font-medium">
                {item.name} · {item.email}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
              <p className="mt-3 text-sm whitespace-pre-wrap">{item.message}</p>
              <Button
                className="mt-3"
                variant="outline"
                size="sm"
                onClick={() => {
                  void deleteContactSubmission(item.id).then(() =>
                    queryClient.invalidateQueries({ queryKey: ['contact-submissions'] }),
                  )
                }}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function AdminMediaPage() {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['media-root'],
    queryFn: () => listMediaFiles(''),
  })

  async function onUpload(file: File) {
    await uploadPortfolioFile(MEDIA_BUCKET, `uploads/${Date.now()}-${file.name}`, file)
    await queryClient.invalidateQueries({ queryKey: ['media-root'] })
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-semibold">Media</h1>
      <Input
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void onUpload(file)
        }}
      />
      <ul className="grid gap-3 sm:grid-cols-2">
        {(query.data ?? [])
          .filter((item) => item.name)
          .map((item) => (
            <li key={item.id ?? item.name} className="rounded-lg border border-border p-3 text-sm">
              <p className="font-mono text-xs">{item.name}</p>
              {item.id ? (
                <img src={publicMediaUrl(item.name)} alt="" className="mt-2 max-h-32 object-contain" />
              ) : null}
              <Button
                className="mt-2"
                size="sm"
                variant="outline"
                onClick={() => {
                  void deleteMediaFile(item.name).then(() =>
                    queryClient.invalidateQueries({ queryKey: ['media-root'] }),
                  )
                }}
              >
                Delete
              </Button>
            </li>
          ))}
      </ul>
    </div>
  )
}
