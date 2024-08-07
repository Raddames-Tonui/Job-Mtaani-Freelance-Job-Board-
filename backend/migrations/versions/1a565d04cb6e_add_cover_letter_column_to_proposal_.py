"""Add status and cover_letter columns to Proposal model

Revision ID: 1a565d04cb6e
Revises: 1a49002f3ab0
Create Date: 2024-08-07 13:53:59.626452
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '1a565d04cb6e'
down_revision = '1a49002f3ab0'
branch_labels = None
depends_on = None

def upgrade():
    # Add the status column with a default value and cover_letter column
    with op.batch_alter_table('proposals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', sa.String(length=50), nullable=False, server_default='pending'))
        batch_op.add_column(sa.Column('cover_letter', sa.String(length=255), nullable=True))

def downgrade():
    # Drop the status and cover_letter columns from the proposals table
    with op.batch_alter_table('proposals', schema=None) as batch_op:
        batch_op.drop_column('status')
        batch_op.drop_column('cover_letter')
