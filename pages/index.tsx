import { EntryList, NewEntry } from '@/components/ui';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import {Layout} from '../components/layouts';

export default function HomePage() {
  return (
    <>
      <Layout
        title='Home - OpenJira'
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 90px)' }}>
              <CardHeader title='TO DO' />

              <CardContent>
                <NewEntry />
                <EntryList status='pending' />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 90px)' }}>
              <CardHeader title='In Progress' />
              <CardContent>
                <EntryList status='in-progress' />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 90px)' }}>
              <CardHeader title='Completed' />
              <CardContent>
                <EntryList status='finished' />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  )
}
